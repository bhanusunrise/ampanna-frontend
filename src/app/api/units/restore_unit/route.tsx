import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { ACTIVE_ITEM } from '@/app/constants/constants';

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
        const query = 'UPDATE units SET status = ? WHERE unit_id = ?';
        const [result] = await connection.execute(query, [ACTIVE_ITEM ,unit_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'No changes made' }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: 'Unit Restored successfully',
            unit_id,
            status: "restored"
        });
    } catch (error) {
        console.error('Error restoring unit:', error);
        return NextResponse.json({ message: 'Failed to restore unit' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}