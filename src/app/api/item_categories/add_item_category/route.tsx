import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function POST(req: Request) {
    try {
        const connection = await dbConnect();

        // Parse the request body to get `item_category_name`
        const { item_category_name } = await req.json();

        // Validate that `item_category_name` is provided
        if (!item_category_name) {
            return NextResponse.json({ error: 'Item category name is required' }, { status: 400 });
        }

        // Generate a new `item_category_id`
        const [latestCategory] = await connection.query(
            `SELECT category_id FROM Item_Categories ORDER BY category_id DESC LIMIT 1`
        );

        let newCategoryId;
        if (latestCategory && latestCategory.length > 0) {
            const latestId = latestCategory[0].category_id;
            const latestNumber = parseInt(latestId.slice(4)) + 1;
            newCategoryId = `ICAT${latestNumber.toString().padStart(2, '0')}`;
        } else {
            newCategoryId = 'ICAT01';
        }

        // Insert the new item category
        const [result] = await connection.execute(
            `INSERT INTO Item_Categories (category_id, category_name, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`,
            [newCategoryId, item_category_name]
        );

        // Close the database connection
        await connection.end();

        // Return success response
        return NextResponse.json({ success: true, category_id: newCategoryId });
    } catch (error) {
        console.error('Error inserting item category:', error);
        return NextResponse.json({ error: 'Failed to insert item category' }, { status: 500 });
    }
}
