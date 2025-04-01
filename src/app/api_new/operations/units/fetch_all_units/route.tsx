import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Unit from "@/app/models/unit_model"; // Ensure your model is correctly exported

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all units
    const units = await Unit.find({}).exec();

    // Return the units in the response
    return NextResponse.json(
      { success: true, data: units },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Units:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}