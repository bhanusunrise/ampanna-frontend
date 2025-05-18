import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Unit from '@/app/models/unit_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        // Validate required fields except `_id`
        if (!body.unit_category_id || !body.unit_name) {
            return NextResponse.json(
                { success: false, message: 'Unit Category ID and Unit Name are required' },
                { status: 400 } // Bad Request
            );
        }

        const allUnits = await Unit.find({});
        const maxId = allUnits.reduce((max, doc) => {
            const idNum = parseInt(doc._id);
                return idNum > max ? idNum : max;
                                }, 0);
        const newId = (maxId + 1).toString();
                        
        console.log('New ID:', newId); // Debug log

        // Create a new Unit object
        const newUnit = new Unit({
            _id: newId.toString(), // Convert number to string to match schema
            unit_category_id: body.unit_category_id,
            unit_name: body.unit_name,
            description: body.description,
        });

        // Save the object to the database
        const savedUnit = await newUnit.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedUnit },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Unit Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Unit:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}