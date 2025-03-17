import {  NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";



export async function GET() {
  try {
    await dbConnect();
    console.log("Fetching all collections");

    if (!mongoose.connection.db) {
      throw new Error("Database connection is not established");
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionData = await Promise.all(
      collections.map(async (col) => {
        const count = mongoose.connection.db ? await mongoose.connection.db.collection(col.name).countDocuments() : 0;
        return {
          collection_name: col.name,
          document_count_storage: count,
        };
      })
    );

    return NextResponse.json(collectionData, { status: 200 });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}