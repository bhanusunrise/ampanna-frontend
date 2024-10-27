import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { ADDED_UNIT_CATEGORY, FAILED_TO_ADD_UNIT_CATEGORY, FILL_UNIT_CATEGORY, UNIT_CATEGORY_PRIMARY_KEY_FIRST_VALUE, UNIT_CATEGORY_PRIMARY_KEY_LETTER } from '@/app/constants/constants';

export async function POST(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_category_name} = body;

        // Validate input
        if (!unit_category_name) {
            return NextResponse.json({ message: FILL_UNIT_CATEGORY }, { status: 400 });
        }

        // Query to find the largest existing unit_id
        const [rows] = await connection.execute(
            'SELECT unit_category_id FROM unit_categories ORDER BY unit_category_id DESC LIMIT 1'
        );

        let newUnitCategoryId = UNIT_CATEGORY_PRIMARY_KEY_FIRST_VALUE; 

        if (rows.length > 0) {
            const latestUnitCategory = rows[0].unit_category_id;
            // Extract the numeric part from the latest unit_id (e.g., "unit01" -> 1)
            const numericPart = parseInt(latestUnitCategory.replace(UNIT_CATEGORY_PRIMARY_KEY_LETTER, ''), 10);
            // Increment the numeric part and pad it to ensure it has at least two digits
            const newNumericPart = (numericPart + 1).toString().padStart(2, '0');
            newUnitCategoryId = UNIT_CATEGORY_PRIMARY_KEY_LETTER + newNumericPart;
        }

        // Insert the new unit into the database
        const query = 'INSERT INTO unit_categories (unit_category_id, unit_category_name) VALUES (?, ?)';
        const [result] = await connection.execute(query, [newUnitCategoryId, unit_category_name]);

        // Return a success response
        return NextResponse.json({
            message: ADDED_UNIT_CATEGORY,
            unit_category_id: newUnitCategoryId,
            unit_category_name,
        });
    } catch (error) {
        //console.error('Error adding unit:', error);
        //return NextResponse.json({ message: 'Failed to add unit' }, { status: 500 });
        return NextResponse.json({ message: FAILED_TO_ADD_UNIT_CATEGORY }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
