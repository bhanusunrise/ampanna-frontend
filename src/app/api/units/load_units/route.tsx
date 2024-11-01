import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function GET() {
    const connection = await dbConnect();
    
    try {
        // Updated SQL query to join units and unit_categories
        const query = `
            SELECT u.unit_id, u.unit_name, u.abbreviation, u.status, 
                   u.unit_category_id, u.createdAt, u.updatedAt, c.unit_category_name 
            FROM units AS u 
            LEFT JOIN unit_categories AS c ON u.unit_category_id = c.unit_category_id 
            ORDER BY u.unit_id DESC
        `;
        
        const [rows] = await connection.execute(query);
        return NextResponse.json(rows);  // Return all units with their category names
    } catch (error) {
        console.error("Error fetching units:", error);
        return NextResponse.error();
    } finally {
        await connection.end();
    }
}
