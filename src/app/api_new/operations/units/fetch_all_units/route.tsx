import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Unit from "@/app/models/unit_model";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
    const unit_category_id = searchParams.get("unit_category_id");
    const unit_name = searchParams.get("unit_name");
    const description = searchParams.get("description");
    const firstNumber = searchParams.get("firstnumber");
    const range = searchParams.get("range");

    // Build filter object dynamically
    const filter: any = {};
    if (_id) filter._id = _id;
    if (unit_category_id) filter.unit_category_id = unit_category_id;
    if (unit_name) filter.unit_name = { $regex: unit_name, $options: "i" };
    if (description) filter.description = { $regex: description, $options: "i" };

    // Handle range filtering for `_id`
    if (firstNumber && range) {
      const firstNumParsed = parseInt(firstNumber, 10);
      const rangeParsed = parseInt(range, 10);
      if (!isNaN(firstNumParsed) && !isNaN(rangeParsed)) {
        filter._id = { $gte: firstNumParsed, $lte: firstNumParsed + rangeParsed };
      }
    }

    // Fetch units along with category details
    const units = await Unit.aggregate([
      { $match: filter }, // Apply dynamic filtering
      {
        $lookup: {
          from: "unit_categories",
          localField: "unit_category_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true, // Include units without categories
        },
      },
      {
        $project: {
          _id: 1,
          unit_category_id: 1,
          unit_name: 1,
          description: 1,
          unit_category_name: "$categoryDetails.unit_category_name",
          category_description: "$categoryDetails.description",
        },
      },
    ]);

    // Return filtered and enriched unit data
    return NextResponse.json({ success: true, data: units }, { status: 200 });
  } catch (error) {
    console.error("Error fetching filtered units with categories:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}