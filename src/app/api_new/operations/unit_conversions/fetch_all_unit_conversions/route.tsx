import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitConversion from "@/app/models/unit_conversion_model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const firstUnitId = searchParams.get("first_unit_id");
    const secondUnitId = searchParams.get("second_unit_id");

    // Build match conditions
    const matchConditions: any = {};
    if (firstUnitId) matchConditions.first_unit_id = firstUnitId;
    if (secondUnitId) matchConditions.second_unit_id = secondUnitId;

    // Fetch unit conversions with filtering
    const unitConversions = await UnitConversion.aggregate([
      { $match: matchConditions }, // Filter by unit IDs
      {
        $lookup: {
          from: "units",
          localField: "first_unit_id",
          foreignField: "_id",
          as: "firstUnitDetails",
        },
      },
      { $unwind: { path: "$firstUnitDetails", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "units",
          localField: "second_unit_id",
          foreignField: "_id",
          as: "secondUnitDetails",
        },
      },
      { $unwind: { path: "$secondUnitDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          first_unit_id: 1,
          first_unit_name: "$firstUnitDetails.unit_name",
          second_unit_id: 1,
          second_unit_name: "$secondUnitDetails.unit_name",
          multiplier: 1,
          description: 1,
        },
      },
    ]);

    return NextResponse.json({ success: true, data: unitConversions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching filtered Unit Conversions:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}