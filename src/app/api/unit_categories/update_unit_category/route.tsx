import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { CANNOT_FIND_UNIT_CATEGORY, DIDNT_CHANGED_UNIT_CATEGORY, FAILED_TO_UPDATE_UNIT_CATEGORY, FILL_UNIT_CATEGORY, UPDATED_UNIT_CATEGORY } from '@/app/constants/constants';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_category_id } = body;

        // Validate input
        if (!unit_category_id) {
            return NextResponse.json({ message: FILL_UNIT_CATEGORY }, { status: 400 });
        }

        // Check if the unit exists
        const [rows] = await connection.execute('SELECT * FROM unit_categories WHERE unit_category_id = ?', [unit_category_id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: CANNOT_FIND_UNIT_CATEGORY }, { status: 404 });
        }

        // Update the unit in the database
        const query = 'UPDATE unit_categories SET unit_category_name = ?';
        const [result] = await connection.execute(query, [unit_category_name]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: DIDNT_CHANGED_UNIT_CATEGORY }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: UPDATED_UNIT_CATEGORY,
            unit_category_id,
            status: "edited"
        });
    } catch (error) {
        //console.error('Error updating unit:', error);
        //return NextResponse.json({ message: 'Failed to update unit' }, { status: 500 });
        return NextResponse.json({ message: FAILED_TO_UPDATE_UNIT_CATEGORY });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
