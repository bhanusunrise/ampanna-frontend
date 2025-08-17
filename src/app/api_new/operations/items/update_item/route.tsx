import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Item from "@/app/models/item_model";

type UpdateItemBody = {
  id: string;
  name?: string;
  description?: string;
  main_unit_id?: string;
  other_unit_ids?: string[];
  other_parameters?: Array<{ parameter_name: string; value: string }>;
  barcode?: string;
};

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    const body = (await request.json()) as UpdateItemBody;
    const {
      id,
      name,
      description,
      main_unit_id,
      other_unit_ids,
      other_parameters,
      barcode,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    // Check if barcode already exists in another item
    if (barcode) {
      const existingItem = await Item.findOne({ barcode, _id: { $ne: id } }).lean();
      if (existingItem) {
        return NextResponse.json(
          { success: false, message: "Barcode must be unique" },
          { status: 400 }
        );
      }
    }

    // Normalize arrays and safely filter out main_unit_id (typed callback)
    const rawOtherUnitIds: string[] = Array.isArray(other_unit_ids) ? other_unit_ids : [];
    const filteredOtherUnitIds =
      main_unit_id
        ? rawOtherUnitIds.filter((unitId: string) => unitId !== String(main_unit_id))
        : rawOtherUnitIds;

    // Build update doc without changing your behavior
    const updateDoc: Record<string, unknown> = {};
    if (name !== undefined) updateDoc.name = name;
    if (description !== undefined) updateDoc.description = description;
    if (main_unit_id !== undefined) updateDoc.main_unit_id = main_unit_id;
    if (other_unit_ids !== undefined) updateDoc.other_unit_ids = filteredOtherUnitIds;
    if (other_parameters !== undefined) updateDoc.other_parameters = other_parameters;
    if (barcode !== undefined) updateDoc.barcode = barcode;

    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      updateDoc,
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Item:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
