import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Item from "@/app/models/item_model";

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
      barcode,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Check if barcode already exists in another item
    if (barcode) {
      const existingItem = await Item.findOne({ barcode, _id: { $ne: id } });
      if (existingItem) {
        return NextResponse.json(
          { success: false, message: "Barcode must be unique" },
          { status: 400 } // Bad Request
        );
      }
    }

    // Remove `main_unit_id` from `other_unit_ids` if present
    const filteredOtherUnitIds = other_unit_ids.filter(unitId => unitId !== main_unit_id);
    console.log("Filtered Other Unit IDs:", filteredOtherUnitIds); // Debug log


    const updatedItem = await Item.findOneAndUpdate(
      { _id: id }, // Match the document by `_id`
      {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(main_unit_id && { main_unit_id }),
        ...(other_unit_ids && { other_unit_ids: filteredOtherUnitIds }), // Corrected line
        ...(other_parameters && { other_parameters }),
        ...(barcode && { barcode }),
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
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}