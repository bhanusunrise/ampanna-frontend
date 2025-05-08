import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitCategory from "@/app/models/unit_category_model";
import Unit from "@/app/models/unit_model"; // Import Unit model

export async function DELETE(req: NextRequest) {
  try {
    // Parse request to get the 'id' parameter
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter is required" },
        { status: 400 } // Bad Request
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if any units reference this unit category
    const existingUnits = await Unit.find({ unit_category_id: id });

    if (existingUnits.length > 0) {
      return NextResponse.json(
        { success: false, message: "Cannot delete unit category. It is referenced by existing units." },
        { status: 409 } // Conflict
      );
    }

    // Proceed with deletion if the category is NOT referenced
    const deletedCategory = await UnitCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Unit category not found" },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      { success: true, message: "Unit category deleted successfully" },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error deleting Unit Category:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
}