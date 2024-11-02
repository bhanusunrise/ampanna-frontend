import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function POST(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unitFrom, unitTo, value } = body;

        // Validate input
        if (!unitFrom || !unitTo || value === undefined) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Generate new conversion IDs
        const [conversionRows] = await connection.execute(
            'SELECT conversion_id FROM unit_conversions ORDER BY conversion_id DESC LIMIT 1'
        );

        let newConversionId = 'CONV1'; // Default starting ID
        let newReciprocalConversionId = 'CONV1'; // Default reciprocal ID

        if (conversionRows.length > 0) {
            const latestConversionId = conversionRows[0].conversion_id;
            const numericPart = parseInt(latestConversionId.replace('CONV', ''), 10);
            const newNumericPart = numericPart + 1;
            newConversionId = `CONV${newNumericPart}`;
            newReciprocalConversionId = `CONV${newNumericPart + 1}`; // Next ID for the reciprocal
        }

        // Prepare the insertion queries
        const query = `
            INSERT INTO unit_conversions (conversion_id, from_unit, value, to_unit)
            VALUES (?, ?, ?, ?)
        `;
        
        // First conversion: unitFrom -> unitTo
        await connection.execute(query, [newConversionId, unitFrom, value, unitTo]);

        // Calculate the reciprocal value
        const reciprocalValue = 1 / value;

        // Second conversion: unitTo -> unitFrom
        await connection.execute(query, [newReciprocalConversionId, unitTo, reciprocalValue, unitFrom]);

        // Return a success response
        return NextResponse.json({
            message: 'Unit conversions added successfully',
            conversions: [
                { conversion_id: newConversionId, from_unit: unitFrom, value, to_unit: unitTo },
                { conversion_id: newReciprocalConversionId, from_unit: unitTo, value: reciprocalValue, to_unit: unitFrom }
            ]
        });
    } catch (error) {
        console.error('Error adding unit conversion:', error);
        return NextResponse.json({ message: 'Failed to add unit conversion' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
