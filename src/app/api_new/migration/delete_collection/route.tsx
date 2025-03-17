import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    console.log("Deleting collection");

    const { searchParams } = new URL(req.url);
    const collection_name = searchParams.get("collection_name");

    if (!collection_name) {
      return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
    }

    if (!mongoose.connection.db) {
      return NextResponse.json({ error: "Database connection is not established" }, { status: 500 });
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collection_name);

    if (!collectionExists) {
      return NextResponse.json({ error: "Collection does not exist" }, { status: 404 });
    }

    await mongoose.connection.db.dropCollection(collection_name);

    return NextResponse.json({ message: `${collection_name} collection deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}
