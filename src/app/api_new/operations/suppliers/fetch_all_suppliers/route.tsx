import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Supplier from "@/app/models/supplier_model"; // Ensure your model is correctly exported
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all suppliers
    const items = await Supplier.find({}).exec();

    // Return the supplier in the response
    return NextResponse.json(
      { success: true, data: items },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetchingSuppliers:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}