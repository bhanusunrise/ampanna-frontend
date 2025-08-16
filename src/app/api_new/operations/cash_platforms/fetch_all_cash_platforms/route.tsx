import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import CashPlatform from "@/app/models/cash_platform_model"; // Ensure your model is correctly exported
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all cash_platforms
    const cash_platforms = await CashPlatform.find({}).exec();

    // Return the cash_platform in the response
    return NextResponse.json(
      { success: true, data: cash_platforms },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching cash_platforms:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}