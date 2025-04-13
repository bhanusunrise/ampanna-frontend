import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import CashPlatform from '@/app/models/cash_platform_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        const { name, description, transaction, is_loan } = body;

        // Validate required fields except `_id`
        if (!name || is_loan === undefined) {
            return NextResponse.json(
                { success: false, message: 'Name and Is Loan flag are required' },
                { status: 400 } // Bad Request
            );
        }

        // Validate transactions if provided
        if (transaction && !Array.isArray(transaction)) {
            return NextResponse.json(
                { success: false, message: 'Transaction must be an array' },
                { status: 400 } // Bad Request
            );
        }

        // Get the maximum `_id` from the existing documents
        const lastCashPlatform = await CashPlatform.findOne().sort({ _id: -1 }); // Sort by `_id` in descending order
        const newId = lastCashPlatform ? parseInt(lastCashPlatform._id) + 1 : 1; // Increment `_id` or start from 1

        // Generate unique IDs for transactions
        const processedTransactions = transaction?.map((item: { description: string; is_in: boolean; amount: number }, index: number) => ({
            _id: `${newId}-${index + 1}`, // Generate unique `_id` for each transaction
            description: item.description,
            is_in: item.is_in,
            amount: item.amount,
        }));

        // Create a new CashPlatform object
        const newCashPlatform = new CashPlatform({
            _id: newId.toString(), // Convert number to string to match schema
            name,
            description,
            transaction: processedTransactions || [],
            is_loan,
        });

        // Save the object to the database
        const savedCashPlatform = await newCashPlatform.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedCashPlatform },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Cash Platform Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Cash Platform:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}