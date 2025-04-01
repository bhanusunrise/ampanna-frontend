import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitCategory from "@/app/models/unit_category_model"; // Ensure your model is correctly exported

export async function DELETE(req: NextRequest) {
  try {
    // Parse the request to get the 'id' parameter
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

    // Attempt to delete the unit category with the provided ID
    const deletedCategory = await UnitCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Unit category not found" },
        { status: 404 } // Not Found
      );
    }

    // Successfully deleted
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