import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { CANNOT_FIND_UNIT_CATEGORY_COUNT } from '@/app/constants/constants';

export async function GET() {
    const connection = await dbConnect();

    try {
        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM unit_categories');
        
        // Access the count from the first row
        const totalCount = rows[0].count;

        return NextResponse.json({ count: totalCount });
    } catch (error) {
        console.error("Error fetching units count:", error);
        return NextResponse.json({ message: CANNOT_FIND_UNIT_CATEGORY_COUNT }, { status: 404 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
