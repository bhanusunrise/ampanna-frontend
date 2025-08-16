import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import Bill from "@/app/models/bill_model"; // Ensure your model is correctly exported

export async function PATCH(request: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const body = await request.json();
        const { id, date, bill_item, additional_discount } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Bill ID is required" },
                { status: 400 } // Bad Request
            );
        }

        // Validate bill items if provided
        if (bill_item && (!Array.isArray(bill_item) || bill_item.length === 0)) {
            return NextResponse.json(
                { success: false, message: "Bill Item must be an array with at least one item" },
                { status: 400 } // Bad Request
            );
        }

        // Update logic
        const updatedBill = await Bill.findOneAndUpdate(
            { _id: id }, // Match the document by `_id`
            {
                ...(date && { date }), // Update only if provided
                ...(bill_item && { bill_item }), // Update only if provided
                ...(additional_discount !== undefined && { additional_discount }), // Update even if 0
            },
            { new: true } // Return the updated document
        );

        if (!updatedBill) {
            return NextResponse.json(
                { success: false, message: "Bill not found" },
                { status: 404 } // Not Found
            );
        }

        // Return the updated document as a response
        return NextResponse.json(
            { success: true, data: updatedBill },
            { status: 200 } // OK
        );
    } catch (error) {
        console.error("Error updating Bill:", error);
        return NextResponse.json(
            { success: false, message: "Server error. Please try again later. + " + error },
            { status: 500 }
        );
    }
}