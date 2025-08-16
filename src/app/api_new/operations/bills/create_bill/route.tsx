import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Bill from '@/app/models/bill_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        const { date, bill_item, additional_discount } = body;

        // Validate required fields except `_id`
        if (!date || !bill_item || !Array.isArray(bill_item) || bill_item.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Date and at least one Bill Item are required' },
                { status: 400 } // Bad Request
            );
        }

        // Validate each bill item
        for (const item of bill_item) {
            if (!item.stock_id || !item.quantity || item.quantity <= 0) {
                return NextResponse.json(
                    { success: false, message: 'Each Bill Item must have a valid Stock ID and Quantity greater than 0' },
                    { status: 400 } // Bad Request
                );
            }
        }

        // Get the maximum `_id` from the existing documents
        const lastBill = await Bill.findOne().sort({ _id: -1 }); // Sort by `_id` in descending order
        const newId = lastBill ? parseInt(lastBill._id) + 1 : 1; // Increment `_id` or start from 1

        // Generate unique IDs for bill items
        const processedBillItems = bill_item.map((item, index) => ({
            _id: `${newId}-${index + 1}`, // Generate unique `_id` for each bill item
            stock_id: item.stock_id,
            quantity: item.quantity,
        }));

        // Create a new Bill object
        const newBill = new Bill({
            _id: newId.toString(), // Convert number to string to match schema
            date,
            bill_item: processedBillItems,
            additional_discount: additional_discount || 0, // Use default value if not provided
        });

        // Save the object to the database
        const savedBill = await newBill.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedBill },
            { status: 201 } // Created
        );
    } catch (error: any) {
        console.error('Error adding new Bill:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}