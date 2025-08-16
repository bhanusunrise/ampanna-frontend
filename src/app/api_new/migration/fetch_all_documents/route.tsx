import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    console.log("Fetching documents from collection");

    const { searchParams } = new URL(req.url);
    const collection_name = searchParams.get("collection_name");

    if (!collection_name) {
      return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
    }

    if (!mongoose.connection.db) {
      throw new Error("Database connection is not established");
    }
    const collection = mongoose.connection.db.collection(collection_name);
    const documents = await collection.find({}).toArray();

    return NextResponse.json({ collection_name, documents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}
