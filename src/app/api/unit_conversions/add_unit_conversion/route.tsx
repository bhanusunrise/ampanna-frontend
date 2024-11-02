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

        // Generate a new conversion ID (e.g., CONV1, CONV2, ...)
        const [conversionRows] = await connection.execute(
            'SELECT conversion_id FROM unit_conversions ORDER BY conversion_id DESC LIMIT 1'
        );

        let newConversionId = 'CONV1'; // Default starting ID

        if (conversionRows.length > 0) {
            const latestConversionId = conversionRows[0].conversion_id;
            // Extract the numeric part from the latest conversion_id (e.g., "CONV1" -> 1)
            const numericPart = parseInt(latestConversionId.replace('CONV', ''), 10);
            // Increment the numeric part
            const newNumericPart = numericPart + 1;
            newConversionId = `CONV${newNumericPart}`;
        }

        // Prepare the insertion query
        const query = `
            INSERT INTO unit_conversions (conversion_id, from_unit, value, to_unit)
            VALUES (?, ?, ?, ?)
        `;
        
        // Insert the new unit conversion into the database
        const [result] = await connection.execute(query, [newConversionId, unitFrom, value, unitTo]);

        // Return a success response
        return NextResponse.json({
            message: 'Unit conversion added successfully',
            conversion_id: newConversionId,
            from_unit: unitFrom,
            value,
            to_unit: unitTo
        });
    } catch (error) {
        console.error('Error adding unit conversion:', error);
        return NextResponse.json({ message: 'Failed to add unit conversion' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
