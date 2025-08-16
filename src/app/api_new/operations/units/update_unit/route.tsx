import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Unit from "@/app/models/unit_model"; 

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();
    const { id, unit_category_id, unit_name, description } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Unit ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the unit by ID and update it
    const updatedUnit = await Unit.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(unit_category_id && { unit_category_id }), // Update only if provided
        ...(unit_name && { unit_name }), // Update only if provided
        ...(description !== undefined && { description }) // Update even if null or empty string
      },
      { new: true } // Return the updated document
    );

    if (!updatedUnit) {
      return NextResponse.json(
        { success: false, message: "Unit not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedUnit },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Unit:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}