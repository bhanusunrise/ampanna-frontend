import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import {    CANNOT_FIND_UNIT_CATEGORY, 
            DELETED_ITEM, 
            DELETED_UNIT_CATEGORY, 
            DIDNT_CHANGED_UNIT_CATEGORY, 
            FAILED_TO_DELETE_UNIT_CATEGORY, 
            OPTIONAL} from '@/app/constants/constants';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_category_id} = body;


        // Check if the unit exists
        const [rows] = await connection.execute('SELECT * FROM unit_categories WHERE unit_category_id = ? && default_status = ?', [unit_category_id, OPTIONAL]);

        if (rows.length === 0) {
            return NextResponse.json({ message: CANNOT_FIND_UNIT_CATEGORY }, { status: 404 });
        }

        // Update the unit in the database
        const query = 'UPDATE unit_categories SET status = ? WHERE unit_category_id = ?';
        const [result] = await connection.execute(query, [DELETED_ITEM ,unit_category_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: DIDNT_CHANGED_UNIT_CATEGORY }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: DELETED_UNIT_CATEGORY,
            unit_category_id,
            status: DELETED_ITEM
        });
    } catch (error) {
        //console.error('Error deleting unit:', error);
        //return NextResponse.json({ message: 'Failed to delete unit' }, { status: 500 });
        return NextResponse.json({ message: FAILED_TO_DELETE_UNIT_CATEGORY }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}