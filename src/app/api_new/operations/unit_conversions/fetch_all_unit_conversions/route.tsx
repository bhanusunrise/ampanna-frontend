import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import UnitConversion from "@/app/models/unit_conversion_model";
import Unit from "@/app/models/unit_model"; // Ensure Unit model is correctly imported

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch unit conversions with corresponding unit names
    const unitConversions = await UnitConversion.aggregate([
      // Lookup first unit details
      {
        $lookup: {
          from: "units", // Collection name
          localField: "first_unit_id",
          foreignField: "_id",
          as: "firstUnitDetails",
        },
      },
      {
        $unwind: {
          path: "$firstUnitDetails",
          preserveNullAndEmptyArrays: true, // Keeps conversions without matching units
        },
      },
      // Lookup second unit details
      {
        $lookup: {
          from: "units", // Collection name
          localField: "second_unit_id",
          foreignField: "_id",
          as: "secondUnitDetails",
        },
      },
      {
        $unwind: {
          path: "$secondUnitDetails",
          preserveNullAndEmptyArrays: true, // Keeps conversions without matching units
        },
      },
      // Project necessary fields
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

    // Return the enriched data
    return NextResponse.json(
      { success: true, data: unitConversions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Unit Conversions with unit names:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}