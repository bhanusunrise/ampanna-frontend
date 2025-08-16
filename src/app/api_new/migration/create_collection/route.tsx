import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log("Connected to database");

    const { collection_name } = await req.json();
    if (!collection_name) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    // Check if collection exists
    if (!mongoose.connection.db) {
      throw new Error("Database connection is not established");
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collection_name);

    if (collectionExists) {
      return NextResponse.json({ message: "Collection already exists" }, { status: 200 });
    }

    // Define empty schema for new collection
    const dynamicSchema = new mongoose.Schema({}, { timestamps: true });
    mongoose.model(collection_name, dynamicSchema);

    return NextResponse.json({ message: `${collection_name} collection created successfully` }, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
  }
}