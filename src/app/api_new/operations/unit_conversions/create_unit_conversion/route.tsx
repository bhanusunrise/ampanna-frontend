import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UnitConversion from '@/app/models/unit_conversion_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        // Validate required fields except `_id`
        const { first_unit_id, second_unit_id, multiplier, description } = body;

        if (!first_unit_id || !second_unit_id || !multiplier) {
            return NextResponse.json(
                { success: false, message: 'First Unit ID, Second Unit ID, and Multiplier are required' },
                { status: 400 } // Bad Request
            );
        }

        // Get the maximum `_id` from the existing documents
        const lastConversion = await UnitConversion.findOne().sort({ _id: -1 }); // Sort by `_id` in descending order
        const newId = lastConversion ? parseInt(lastConversion._id) + 1 : 1; // Increment `_id` or start from 1

        // Create a new Unit Conversion object
        const newConversion = new UnitConversion({
            _id: newId.toString(), // Convert number to string to match schema
            first_unit_id,
            second_unit_id,
            multiplier,
            description,
        });

        // Save the object to the database
        const savedConversion = await newConversion.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedConversion },
            { status: 201 } // Created
        );
    } catch (error: any) {
        console.error('Error adding new Unit Conversion:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}