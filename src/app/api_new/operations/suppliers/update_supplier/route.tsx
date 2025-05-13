import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Supplier from "@/app/models/supplier_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();
    const {
      id,
      name,
      addresses,
      contactnos,
      emails,
      websites,
      description,
      other_parameters,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Supplier ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the supplier by ID and update it
    const updatedSupplier = await Supplier.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(name && { name }), // Update only if provided
        ...(addresses && { addresses }), // Update only if provided
        ...(contactnos && { contactnos }), // Update only if provided
        ...(emails && { emails }), // Update only if provided
        ...(websites && { websites }), // Update only if provided
        ...(description !== undefined && { description }), // Update even if null or empty string
        ...(other_parameters && { other_parameters }), // Update only if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedSupplier) {
      return NextResponse.json(
        { success: false, message: "Supplier not found" },
        { status: 404 } // Not Found
      );
    }

    // Return the updated document as a response
    return NextResponse.json(
      { success: true, data: updatedSupplier },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error updating Supplier:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 }
    );
  }
}