import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function DELETE() {
    const connection = await dbConnect();

    try {
        // Execute the DROP DATABASE command
        await connection.query('DROP DATABASE IF EXISTS ampanna_client');

        return NextResponse.json({ message: "Database ampanna_client deleted successfully" });
    } catch (error) {
        console.error("Error deleting database:", error);
        return NextResponse.json({ error: "Error deleting database" }, { status: 500 });
    } finally {
        // Release the database connection
        await connection.end();
    }
}
