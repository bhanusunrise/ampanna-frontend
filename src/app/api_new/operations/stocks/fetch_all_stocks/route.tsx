import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Stock from "@/app/models/stock_model";
import Supplier from "@/app/models/supplier_model";
import Item from "@/app/models/item_model";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract the item_id from query parameters
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("item_id");

    // Define the query object
    const query = itemId ? { item_id: itemId } : {}; // If item_id is provided, filter stocks

    // Fetch stocks based on the query
    const stocks = await Stock.find(query).lean().exec();

    // Populate supplier and item names
    for (let stock of stocks) {
      if (stock.supplier_id) {
        const supplier = await Supplier.findById(stock.supplier_id).lean().exec();
        stock.supplier_name = supplier?.name || "Unknown Supplier";
      }

      if (stock.item_id) {
        const item = await Item.findById(stock.item_id).lean().exec();
        stock.item_name = item?.name || "Unknown Item";
      }
    }

    // Return filtered stock data
    return NextResponse.json(
      { success: true, data: stocks },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Stocks:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}