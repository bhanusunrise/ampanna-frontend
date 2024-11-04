import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function POST(req: Request) {
    const connection = await dbConnect();

    try {
        // Execute the CREATE DATABASE command
        await connection.query('CREATE DATABASE IF NOT EXISTS ampanna_client');

        return NextResponse.json({ message: "Database ampanna_client created successfully" });
    } catch (error) {
        console.error("Error creating database:", error);
        return NextResponse.json({ error: "Error creating database" }, { status: 500 });
    } finally {
        // Release the database connection
        await connection.end(); // Use end() instead of release()
    }
}
