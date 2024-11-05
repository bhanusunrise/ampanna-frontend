import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; 
import { ACTIVE_ITEM, CANNOT_FIND_UNIT_CATEGORY } from '@/app/constants/constants';

export async function POST(request) {
    // Parse the request body to get the unit_category_id
    const { unit_category_id } = await request.json();

    if (!unit_category_id) {
        return NextResponse.json({ error: 'unit_category_id is required' }, { status: 400 });
    }

    const connection = await dbConnect();

    try {
        // Query to fetch units where status is "සක්‍රීය" and unit_category_id matches
        const query = `
            SELECT *
            FROM Units
            WHERE unit_category_id = ? AND status = ?
        `;
        
        const [rows] = await connection.execute(query, [unit_category_id, ACTIVE_ITEM]);

        // Check if any units were found
        if (rows.length === 0) {
            return NextResponse.json({ error: CANNOT_FIND_UNIT_CATEGORY }, { status: 404 });
        }

        // Return the found units
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        // Close the database connection
        await connection.end();
    }
}
