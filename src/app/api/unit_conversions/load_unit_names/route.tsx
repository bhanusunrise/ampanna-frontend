import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; 
export async function GET() {
    const connection = await dbConnect();
    
    try {
        const [rows] = await connection.execute('SELECT unit_id, unit_name FROM units ORDER BY unit_id DESC');
        return NextResponse.json(rows); 
    } catch (error) {
        console.error("Error fetching units:", error);
        return NextResponse.error();
    } finally {
        await connection.end();
    }
}

