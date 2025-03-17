import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log("Connected to database");

    const { collection_name, fields } = await req.json();
    if (!collection_name || !fields || !Array.isArray(fields)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    // Define dynamic schema
    const schemaDefinition: any = {};
    fields.forEach((field: { name: string; type: keyof typeof mongoose.Schema.Types; required: boolean }) => {
      schemaDefinition[field.name] = { type: mongoose.Schema.Types[field.type], required: field.required };
    });

    const dynamicSchema = new mongoose.Schema(schemaDefinition, { timestamps: true });
    const DynamicModel = mongoose.models[collection_name] || mongoose.model(collection_name, dynamicSchema);

    // Check if collection exists
    if (!mongoose.connection.db) {
      throw new Error("Database connection is not established");
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === collection_name);
    
    if (collectionExists) {
      return NextResponse.json({ message: "Collection already exists" }, { status: 200 });
    }

    return NextResponse.json({ message: `${collection_name} collection created successfully` }, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
  }
}
