import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitCategory from "@/app/models/unit_category_model"; // Ensure your model is correctly exported

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
    const unit_category_name = searchParams.get("unit_category_name");
    const description = searchParams.get("description");
    const firstNumber = searchParams.get("firstnumber");
    const range = searchParams.get("range");

    // Build the filter object dynamically
    const filter: any = {};

    if (_id) filter._id = _id;
    if (unit_category_name) filter.unit_category_name = { $regex: unit_category_name, $options: "i" };
    if (description) filter.description = { $regex: description, $options: "i" };

    // Handle range query if both values are provided
    if (firstNumber && range) {
      const firstNumParsed = parseInt(firstNumber, 10);
      const rangeParsed = parseInt(range, 10);
      if (!isNaN(firstNumParsed) && !isNaN(rangeParsed)) {
        filter._id = { $gte: firstNumParsed, $lte: firstNumParsed + rangeParsed };
      }
    }

    // Fetch filtered unit categories
    const unitCategories = await UnitCategory.find(filter).exec();

    // Return the filtered categories in the response
    return NextResponse.json(
      { success: true, data: unitCategories },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching Unit Categories:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 } // Internal Server Error
    );
  }
}