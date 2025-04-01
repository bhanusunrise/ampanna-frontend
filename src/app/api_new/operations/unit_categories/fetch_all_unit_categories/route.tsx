import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitCategory from "@/app/models/unit_category_model"; // Ensure your model is correctly exported

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all unit categories
    const unitCategories = await UnitCategory.find({}).exec();

    // Return the categories in the response
    return NextResponse.json(
      { success: true, data: unitCategories },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Unit Categories:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}