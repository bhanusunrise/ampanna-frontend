import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import { ACTIVE_ITEM } from '@/app/constants/constants';

export async function GET() {
    try {
        const connection = await dbConnect();

        // Query to fetch all item categories with a specific status ordered by `category_id` in descending order
        const [rows] = await connection.query(
            `SELECT * FROM Item_Categories WHERE status = ? ORDER BY category_id DESC`,
            [ACTIVE_ITEM]
        );

        // Close the database connection
        await connection.end();

        // Return the fetched rows as JSON response
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error loading item categories:', error);
        return NextResponse.json({ error: 'Failed to load item categories' }, { status: 500 });
    }
}
