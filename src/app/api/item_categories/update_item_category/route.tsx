import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function PUT(req: Request) {
    try {
        const connection = await dbConnect();

        // Parse the request body to get `category_id` and `category_name`
        const { category_id, category_name } = await req.json();

        // Validate that `category_id` and `category_name` are provided
        if (!category_id || !category_name) {
            return NextResponse.json({ error: 'Category ID and name are required' }, { status: 400 });
        }

        // Update the item category with the new name
        const [result] = await connection.execute(
            `UPDATE Item_Categories SET category_name = ?, updatedAt = NOW() WHERE category_id = ?`,
            [category_name, category_id]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Item category not found' }, { status: 404 });
        }

        // Close the database connection
        await connection.end();

        // Return success response
        return NextResponse.json({ success: true, message: 'Item category updated successfully' });
    } catch (error) {
        console.error('Error updating item category:', error);
        return NextResponse.json({ error: 'Failed to update item category' }, { status: 500 });
    }
}
