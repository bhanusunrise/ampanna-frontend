import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import {
    ACTIVE_ITEM,

} from '@/app/constants/constants';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { item_category_id } = body;

        // Check if the item category exists
        const [rows] = await connection.execute('SELECT * FROM item_categories WHERE category_id = ?', [item_category_id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: "Cannot find item category" }, { status: 404 });
        }

        // Update the item category in the database
        const query = 'UPDATE item_categories SET status = ? WHERE category_id = ?';
        const [result] = await connection.execute(query, [ACTIVE_ITEM, item_category_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "No changes made" }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: "Item category restored successfully",
            item_category_id,
            status: ACTIVE_ITEM,
        });
    } catch (error) {
        // Log error for debugging
        console.error('Error restoring item category:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
