import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import CashPlatform from "@/app/models/cash_platform_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const body = await request.json();
        const { id, name, description, transaction, is_loan } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Cash Platform ID is required" },
                { status: 400 } // Bad Request
            );
        }

        // Validate transactions if provided
        if (transaction && !Array.isArray(transaction)) {
            return NextResponse.json(
                { success: false, message: "Transaction must be an array" },
                { status: 400 } // Bad Request
            );
        }

        // Update logic
        const updatedCashPlatform = await CashPlatform.findOneAndUpdate(
            { _id: id }, // Match the document by `_id`
            {
                ...(name && { name }), // Update only if provided
                ...(description !== undefined && { description }), // Update even if null or empty string
                ...(transaction && { transaction }), // Update only if provided
                ...(is_loan !== undefined && { is_loan }), // Update even if false
            },
            { new: true } // Return the updated document
        );

        if (!updatedCashPlatform) {
            return NextResponse.json(
                { success: false, message: "Cash Platform not found" },
                { status: 404 } // Not Found
            );
        }

        // Return the updated document as a response
        return NextResponse.json(
            { success: true, data: updatedCashPlatform },
            { status: 200 } // OK
        );
    } catch (error) {
        console.error("Error updating Cash Platform:", error);
        return NextResponse.json(
            { success: false, message: "Server error. Please try again later. + " + error },
            { status: 500 }
        );
    }
}