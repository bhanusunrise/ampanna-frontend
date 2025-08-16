import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Bill from "@/app/models/bill_model";
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all bills
    const bills = await Bill.find({}).exec();

    // Return the bill in the response
    return NextResponse.json(
      { success: true, data: bills },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetchingbills:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. + " + error },
      { status: 500 } // Internal Server Error
    );
  }
}