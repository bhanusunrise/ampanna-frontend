import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Stock from "@/app/models/stock_model";
import Supplier from "@/app/models/supplier_model";
import Item from "@/app/models/item_model";

type StockLean = {
  _id: string | { toString(): string };
  item_id?: string;
  supplier_id?: string;
  total_quantity?: number;
  sold_quantity?: number;
  damaged_quantity?: number;
  selling_price?: number;
  name?: string;

  // fields we add in this route:
  supplier_name?: string;
  item_name?: string;
};

type SupplierLean = { _id: string; name?: string };
type ItemLean = { _id: string; name?: string };

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("item_id");
    const sortForId = searchParams.get("sort_for_id");

    const query: Partial<Pick<StockLean, "item_id">> = itemId ? { item_id: itemId } : {};

    // Explicitly type lean() results to avoid array|doc unions
    const stocks = await Stock.find(query).lean<StockLean[]>().exec();

    // Enrich with supplier/item names
    for (const stock of stocks) {
      if (stock.supplier_id) {
        const supplier = await Supplier.findById(stock.supplier_id)
          .select("name")
          .lean<SupplierLean>()
          .exec();
        stock.supplier_name = supplier?.name || "Unknown Supplier";
      }

      if (stock.item_id) {
        const item = await Item.findById(stock.item_id)
          .select("name")
          .lean<ItemLean>()
          .exec();
        stock.item_name = item?.name || "Unknown Item";
      }
    }

    if (sortForId) {
      stocks.sort((a, b) => {
        const idA = typeof a._id === "string" ? a._id : a._id.toString();
        const idB = typeof b._id === "string" ? b._id : b._id.toString();
        return idA.localeCompare(idB);
      });
    }

    return NextResponse.json({ success: true, data: stocks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Stocks:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}
