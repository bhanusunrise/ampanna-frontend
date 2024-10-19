import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/db'; // Adjust the path if necessary

export async function POST(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_name, abbreviation } = body;

        // Validate input
        if (!unit_name || !abbreviation) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Query to find the largest existing unit_id
        const [rows] = await connection.execute(
            'SELECT unit_id FROM units ORDER BY unit_id DESC LIMIT 1'
        );

        let newUnitId = 'unit01'; // Default starting ID

        if (rows.length > 0) {
            const latestUnitId = rows[0].unit_id;
            // Extract the numeric part from the latest unit_id (e.g., "unit01" -> 1)
            const numericPart = parseInt(latestUnitId.replace('unit', ''), 10);
            // Increment the numeric part and pad it to ensure it has at least two digits
            const newNumericPart = (numericPart + 1).toString().padStart(2, '0');
            newUnitId = `unit${newNumericPart}`;
        }

        // Insert the new unit into the database
        const query = 'INSERT INTO units (unit_id, unit_name, abbreviation) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [newUnitId, unit_name, abbreviation]);

        // Return a success response
        return NextResponse.json({
            message: 'Unit added successfully',
            unit_id: newUnitId,
            unit_name,
            abbreviation
        });
    } catch (error) {
        console.error('Error adding unit:', error);
        return NextResponse.json({ message: 'Failed to add unit' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
