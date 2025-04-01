import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UnitCategory from '@/app/models/unit_category_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        // Validate required fields except `_id`
        if (!body.unit_category_name) {
            return NextResponse.json(
                { success: false, message: 'Unit Category Name is required' },
                { status: 400 } // Bad Request
            );
        }

        // Get the maximum `_id` from the existing documents
        const lastUnitCategory = await UnitCategory.findOne().sort({ _id: -1 }); // Sort by `_id` in descending order
        const newId = lastUnitCategory ? parseInt(lastUnitCategory._id) + 1 : 1; // Increment `_id` or start from 1

        // Create a new Unit Category object
        const newUnitCategory = new UnitCategory({
            _id: newId.toString(), // Convert number to string to match schema
            unit_category_name: body.unit_category_name,
            description: body.description,
        });

        // Save the object to the database
        const savedUnitCategory = await newUnitCategory.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedUnitCategory },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Unit Category Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Unit Category:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}