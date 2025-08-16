import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitConversion from "@/app/models/unit_conversion_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();
    const { id, first_unit_id, second_unit_id, multiplier, description } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Unit Conversion ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the unit conversion by ID and update it
    const updatedConversion = await UnitConversion.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(first_unit_id && { first_unit_id }), // Update only if provided
        ...(second_unit_id && { second_unit_id }), // Update only if provided
        ...(multiplier !== undefined && { multiplier }), // Update even if null or 0
        ...(description !== undefined && { description }) // Update even if null or empty string
      },
      { new: true } // Return the updated document
    );

    if (!updatedConversion) {
      return NextResponse.json(
        { success: false, message: "Unit Conversion not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedConversion },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Unit Conversion:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}