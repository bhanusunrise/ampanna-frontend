import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function POST(request: Request) {
    const connection = await dbConnect();
    
    try {
        const { unit_ids } = await request.json();
        
        if (!Array.isArray(unit_ids) || unit_ids.length === 0) {
            return NextResponse.json({ error: 'Invalid unit_ids format' }, { status: 400 });
        }

        // Use placeholders for dynamic number of IDs
        const placeholders = unit_ids.map(() => '?').join(',');
        
        const query = `
            SELECT u.unit_id, u.unit_name, u.abbreviation, u.status, 
                   u.unit_category_id, u.createdAt, u.updatedAt, c.unit_category_name 
            FROM units AS u 
            LEFT JOIN unit_categories AS c ON u.unit_category_id = c.unit_category_id 
            WHERE u.unit_id IN (${placeholders})
            ORDER BY u.unit_id DESC
        `;
        
        const [rows] = await connection.execute(query, unit_ids);
        return NextResponse.json(rows);  // Return filtered units with their category names
    } catch (error) {
        console.error("Error fetching units:", error);
        return NextResponse.error();
    } finally {
        await connection.end();
    }
}
