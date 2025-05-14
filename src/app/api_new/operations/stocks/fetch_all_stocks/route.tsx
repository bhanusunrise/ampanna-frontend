import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Stock from "@/app/models/stock_model";
import Supplier from "@/app/models/supplier_model"; // Assuming you have a supplier model
import Item from "@/app/models/item_model"; // Assuming you have an item model

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all stocks with supplier_name and item_name populated
    const stocks = await Stock.find({})
      .lean() // Converts mongoose documents into plain JavaScript objects
      .exec();

    // Fetch supplier names and item names separately
    for (let stock of stocks) {
      if (stock.supplier_id) {
        const supplier = await Supplier.findById(stock.supplier_id).lean().exec();
        stock.supplier_name = supplier?.name || "Unknown Supplier"; // Assign supplier name
      }

      if (stock.item_id) {
        const item = await Item.findById(stock.item_id).lean().exec();
        stock.item_name = item?.name || "Unknown Item"; // Assign item name
      }
    }

    // Return the modified stock data with supplier and item names
    return NextResponse.json(
      { success: true, data: stocks },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Stocks :", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 } // Internal Server Error
    );
  }
}