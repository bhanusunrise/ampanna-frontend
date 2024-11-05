import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function GET() {
  try {
    const connection = await dbConnect();

    // Fetch all suppliers from the database
    const [suppliers] = await connection.query(`
      SELECT *
      FROM Suppliers ORDER BY supplier_id DESC
    `);

    // Close the database connection
    await connection.end();

    // Return the list of suppliers as JSON
    return NextResponse.json({ suppliers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 });
  }
}
