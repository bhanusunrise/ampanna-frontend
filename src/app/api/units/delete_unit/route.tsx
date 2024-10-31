import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_id} = body;


        // Check if the unit exists
        const [rows] = await connection.execute('SELECT * FROM units WHERE unit_id = ?', [unit_id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Unit not found' }, { status: 404 });
        }

        // Update the unit in the database
        const query = 'UPDATE units SET status = "deleted", updatedAt = NOW() WHERE unit_id = ?';
        const [result] = await connection.execute(query, [unit_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'No changes made' }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: 'Unit deleted successfully',
            unit_id,
            status: "deleted"
        });
    } catch (error) {
        console.error('Error deleting unit:', error);
        return NextResponse.json({ message: 'Failed to delete unit' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}