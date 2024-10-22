import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/db'; // Adjust the path if necessary

export async function GET() {
    const connection = await dbConnect();

    try {
        const [rows] = await connection.execute('SELECT * FROM units');
        const totalCount = rows[0].count;
        
        return NextResponse.json({ count: totalCount });
    } catch (error) {
        console.error("Error fetching units count:", error);
        return NextResponse.error();
    } finally {
        await connection.end(); // Close the connection after use
    }
}
