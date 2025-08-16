import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitCategory from "@/app/models/unit_category_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();
    const { id, unit_category_name, description } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Unit Category ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the unit category by ID and update it
    const updatedCategory = await UnitCategory.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      { 
        ...(unit_category_name && { unit_category_name }), // Update only if provided
        ...(description !== undefined && { description }) // Update even if null or empty string
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Unit Category not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedCategory },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Unit Category:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}