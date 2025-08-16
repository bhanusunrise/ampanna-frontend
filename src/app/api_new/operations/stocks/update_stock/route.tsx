import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Stock from "@/app/models/stock_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();
    const {
      id,
      name,
      description,
      supplier_id,
      item_id,
      date,
      total_quantity,
      sold_quantity,
      damaged_quantity,
      buying_price,
      selling_price,
      discount,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Stock ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the stock by ID and update it
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(name && { name }), // Update only if provided
        ...(description !== undefined && { description }), // Update even if null or empty string
        ...(supplier_id && { supplier_id }), // Update only if provided
        ...(item_id && { item_id }), // Update only if provided
        ...(date && { date }), // Update only if provided
        ...(total_quantity !== undefined && { total_quantity }), // Update even if 0
        ...(sold_quantity !== undefined && { sold_quantity }), // Update even if 0
        ...(damaged_quantity !== undefined && { damaged_quantity }), // Update even if 0
        ...(buying_price !== undefined && { buying_price }), // Update even if 0
        ...(selling_price !== undefined && { selling_price }), // Update even if 0
        ...(discount && { discount }), // Update only if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedStock) {
      return NextResponse.json(
        { success: false, message: "Stock not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedStock },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Stock:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}