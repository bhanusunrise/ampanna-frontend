import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Unit from "@/app/models/unit_model"; 

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
    const deletedUnit = await Unit.findByIdAndDelete(id);

    if (!deletedUnit) {
      return NextResponse.json(
        { success: false, message: "Unit not found" },
        { status: 404 } // Not Found
      );
    }

    // Successfully deleted
    return NextResponse.json(
      { success: true, message: "Unit deleted successfully" },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error deleting Unit:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
}