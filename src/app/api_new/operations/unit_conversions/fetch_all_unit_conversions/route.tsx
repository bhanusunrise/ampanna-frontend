import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitConversion from "@/app/models/unit_conversion_model"; 

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all unit conversion
    const unitConversions = await UnitConversion.find({}).exec();

    // Return the conversion in the response
    return NextResponse.json(
      { success: true, data: unitConversions },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Unit Conversions:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}