import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Item from "@/app/models/item_model"; // Ensure your model is correctly exported
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all items
    const items = await Item.find({}).exec();

    // Return the item in the response
    return NextResponse.json(
      { success: true, data: items },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetchingItems:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}