import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/db'; 
export async function GET() {
    const connection = await dbConnect();
    
    try {
        const [rows] = await connection.execute('SELECT * FROM units ORDER BY unit_id DESC');
        return NextResponse.json(rows);  // Return all units at once
    } catch (error) {
        console.error("Error fetching units:", error);
        return NextResponse.error();
    } finally {
        await connection.end();
    }
}

