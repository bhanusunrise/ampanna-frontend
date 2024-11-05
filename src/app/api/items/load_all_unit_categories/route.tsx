import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; 
import { ACTIVE_ITEM, CANNOT_FIND_UNIT_CATEGORY } from '@/app/constants/constants';
export async function GET() {
    const connection = await dbConnect();
    
    try {
        const [rows] = await connection.execute('SELECT * FROM unit_categories WHERE status = ? ORDER BY unit_category_id DESC',
            [ACTIVE_ITEM]);
        return NextResponse.json(rows);  // Return all units at once
    } catch (error) {
        //console.error("Error fetching units:", error);
        //return NextResponse.error();
        return NextResponse.json({ message: CANNOT_FIND_UNIT_CATEGORY }, { status: 404 });
    } finally {
        await connection.end();
    }
}

