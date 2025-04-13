import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Item from "@/app/models/item_model"; // Ensure your model is correctly exported

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
      main_unit_id,
      other_unit_ids,
      other_parameters,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the item by ID and update it
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(name && { name }), // Update only if provided
        ...(description !== undefined && { description }), // Update even if null or empty string
        ...(main_unit_id && { main_unit_id }), // Update only if provided
        ...(other_unit_ids && { other_unit_ids }), // Update only if provided
        ...(other_parameters && { other_parameters }), // Update only if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedItem },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Item:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}