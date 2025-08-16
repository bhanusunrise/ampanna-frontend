import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Item from "@/app/models/item_model";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch items with unit details
    const items = await Item.aggregate([
      // Lookup main unit details
      {
        $lookup: {
          from: "units", // Collection name
          localField: "main_unit_id",
          foreignField: "_id",
          as: "mainUnitDetails",
        },
      },
      {
        $unwind: {
          path: "$mainUnitDetails",
          preserveNullAndEmptyArrays: true, // Keeps items without matching units
        },
      },
      // Lookup other unit details
      {
        $lookup: {
          from: "units", // Collection name
          localField: "other_unit_ids",
          foreignField: "_id",
          as: "otherUnitDetails",
        },
      },
      // Project necessary fields
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          main_unit_id: 1,
          main_unit_name: "$mainUnitDetails.unit_name",
          other_unit_ids: 1,
          other_unit_names: "$otherUnitDetails.unit_name",
          barcode: 1,
          other_parameters: 1,
        },
      },
    ]);

    // Return the enriched data
    return NextResponse.json(
      { success: true, data: items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Items with unit details:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later. " + error },
      { status: 500 }
    );
  }
}