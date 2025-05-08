import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Unit from "@/app/models/unit_model";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch units along with their category details
    const units = await Unit.aggregate([
      {
        $lookup: {
          from: "unit_categories", // Collection name
          localField: "unit_category_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true, // Keeps units without matching categories
        },
      },
      {
        $project: {
          _id: 1,
          unit_category_id: 1,
          unit_name: 1,
          description: 1,
          unit_category_name: "$categoryDetails.unit_category_name"
        },
      },
    ]);

    // Return the enriched data
    return NextResponse.json(
      { success: true, data: units },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching units with categories:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}