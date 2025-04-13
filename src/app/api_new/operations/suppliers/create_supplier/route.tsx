import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Supplier from '@/app/models/supplier_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        const {
            name,
            addresses,
            contactnos,
            emails,
            websites,
            description,
            other_parameters,
            item_ids,
        } = body;

        // Validate required fields except `_id`
        if (!name) {
            return NextResponse.json(
                { success: false, message: 'Supplier Name is required' },
                { status: 400 } // Bad Request
            );
        }

        // Get the maximum `_id` from the existing documents
        const lastSupplier = await Supplier.findOne().sort({ _id: -1 }); // Sort by `_id` in descending order
        const newId = lastSupplier ? parseInt(lastSupplier._id) + 1 : 1; // Increment `_id` or start from 1

        // Create a new Supplier object
        const newSupplier = new Supplier({
            _id: newId.toString(), // Convert number to string to match schema
            name,
            addresses,
            contactnos,
            emails,
            websites,
            description,
            other_parameters,
            item_ids,
        });

        // Save the object to the database
        const savedSupplier = await newSupplier.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedSupplier },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Supplier Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Supplier:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}