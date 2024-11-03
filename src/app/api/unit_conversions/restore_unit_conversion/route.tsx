import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { ACTIVE_ITEM } from '@/app/constants/constants';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_conversion_id} = body;


        // Check if the unit conversion exists
        const [rows] = await connection.execute('SELECT * FROM unit_conversions WHERE conversion_id = ?', [unit_conversion_id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Unit conversion not found' }, { status: 404 });
        }

        // Update the unit conversion in the database
        const query = `UPDATE unit_conversions SET status = ? , updatedAt = NOW() WHERE conversion_id = ?`;
        const [result] = await connection.execute(query, [ACTIVE_ITEM ,unit_conversion_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'No changes made' }, { status: 200 });
        }

        // Return a success response
        return NextResponse.json({
            message: 'Unit conversion restored successfully',
            unit_conversion_id,
            status: "restored"
        });
    } catch (error) {
        console.error('Error restoring unit conversion:', error);
        return NextResponse.json({ message: 'Failed to restoreS unit conversion' }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}