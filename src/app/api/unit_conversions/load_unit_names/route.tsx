import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function GET(request: Request) {
    const connection = await dbConnect();
    
    try {
        // Parse URL to extract query parameters
        const url = new URL(request.url);
        const unitCategoryId = url.searchParams.get('unit_category_id');
        
        // Check if unit_category_id is provided
        if (!unitCategoryId) {
            return NextResponse.json({ error: 'unit_category_id is required' }, { status: 400 });
        }
        
        // Fetch units based on unit_category_id
        const [rows] = await connection.execute(
            'SELECT unit_id, unit_name FROM units WHERE unit_category_id = ? ORDER BY unit_id DESC',
            [unitCategoryId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'No units found' }, { status: 404 });
        }
        
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching units:", error);
        return NextResponse.json({ error: 'Error fetching units' }, { status: 500 });
    } finally {
        await connection.end();
    }
}
