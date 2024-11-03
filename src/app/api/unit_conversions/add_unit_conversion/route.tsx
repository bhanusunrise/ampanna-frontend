import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

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

        // Ensure value is positive
        if (value <= 0) {
            return NextResponse.json({ message: 'Value must be a positive number' }, { status: 400 });
        }

        // Ensure unitFrom and unitTo are not the same
        if (unitFrom === unitTo) {
            return NextResponse.json({ message: 'fromUnit and toUnit cannot be the same' }, { status: 400 });
        }

        // Check if the units belong to the same category
        const [unitCategories] = await connection.execute(
            `SELECT u1.unit_category_id AS categoryFrom, u2.unit_category_id AS categoryTo
             FROM units AS u1
             JOIN units AS u2 ON u1.unit_id = ? AND u2.unit_id = ?`,
            [unitFrom, unitTo]
        );

        if (unitCategories.length === 0 || unitCategories[0].categoryFrom !== unitCategories[0].categoryTo) {
            return NextResponse.json({ message: 'Units must belong to the same category' }, { status: 400 });
        }

        // Check if the conversion already exists in either direction
        const [existingConversions] = await connection.execute(
            `SELECT * FROM unit_conversions 
             WHERE (from_unit = ? AND to_unit = ?)
                OR (from_unit = ? AND to_unit = ?)`,
            [unitFrom, unitTo, unitTo, unitFrom]
        );

        if (existingConversions.length > 0) {
            return NextResponse.json({ message: 'This unit conversion already exists' }, { status: 409 });
        }

        // Use transaction to ensure atomicity
        await connection.beginTransaction();

        // Generate new conversion IDs
        const [conversionRows] = await connection.execute(
            'SELECT conversion_id FROM unit_conversions ORDER BY conversion_id DESC LIMIT 1'
        );

        let newConversionId = 'CONV1'; // Default starting ID
        let newReciprocalConversionId = 'CONV2'; // Default starting ID for the reciprocal

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

        // Commit the transaction
        await connection.commit();

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

        // Rollback the transaction on error
        await connection.rollback();

        return NextResponse.json({ message: 'Failed to add unit conversion', error: error.message }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
