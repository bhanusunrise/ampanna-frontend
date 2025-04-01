import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Stock from "@/app/models/stock_model"
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all stocks
    const stocks = await Stock.find({}).exec();

    // Return the stock in the response
    return NextResponse.json(
      { success: true, data: stocks },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Stocks :", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}