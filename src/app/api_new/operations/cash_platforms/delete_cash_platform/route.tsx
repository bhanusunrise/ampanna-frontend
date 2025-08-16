import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import CashPlatform from "@/app/models/cash_platform_model"; // Ensure your model is correctly exported
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

    // Attempt to delete the cash platform with the provided ID
    const deletedCashPlatform = await CashPlatform.findByIdAndDelete(id);

    if (!deletedCashPlatform) {
      return NextResponse.json(
        { success: false, message: "Cash platform not found" },
        { status: 404 } // Not Found
      );
    }

    // Successfully deleted
    return NextResponse.json(
      { success: true, message: "Cash Platform deleted successfully" },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error deleting Cash PlatformS:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
}