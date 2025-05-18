import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UnitConversion from '@/app/models/unit_conversion_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        // Ensure the request body is an array
        if (!Array.isArray(body) || body.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Input must be a non-empty array of unit conversions' },
                { status: 400 } // Bad Request
            );
        }

        // Get all documents to calculate the max numeric _id
                const allConversions = await UnitConversion.find({});
                const maxId = allConversions.reduce((max, doc) => {
                    const idNum = parseInt(doc._id);
                    return idNum > max ? idNum : max;
                }, 0);
                let newId = (maxId + 1).toString();
        
                console.log('New ID:', newId); // Debug log

        const uniqueConversions = [];

        for (const { first_unit_id, second_unit_id, multiplier, description } of body) {
            // Validate required fields
            if (!first_unit_id || !second_unit_id || !multiplier) {
                return NextResponse.json(
                    { success: false, message: 'First Unit ID, Second Unit ID, and Multiplier are required' },
                    { status: 400 } // Bad Request
                );
            }

            // Check if the conversion already exists in the database
            const existingConversion = await UnitConversion.findOne({
                first_unit_id,
                second_unit_id,
                multiplier
            });

            if (!existingConversion) {
                uniqueConversions.push({
                    _id: (newId++).toString(),
                    first_unit_id,
                    second_unit_id,
                    multiplier,
                    description
                });
            }
        }

        // If there are new conversions, insert them into the database
        if (uniqueConversions.length > 0) {
            const savedConversions = await UnitConversion.insertMany(uniqueConversions);
            return NextResponse.json(
                { success: true, data: savedConversions },
                { status: 201 } // Created
            );
        } else {
            return NextResponse.json(
                { success: false, message: 'No new unit conversions were added as all were duplicates' },
                { status: 200 } // OK (but no new data added)
            );
        }
    } catch (error: any) {
        console.error('Error adding Unit Conversions:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. ' + error },
            { status: 500 }
        );
    }
}