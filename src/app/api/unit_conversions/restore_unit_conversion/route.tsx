import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary
import { ACTIVE_ITEM } from '@/app/constants/constants';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { unit_conversion_id } = body;

        // Check if the unit conversion exists
        const [rows] = await connection.execute(
            'SELECT * FROM unit_conversions WHERE conversion_id = ?',
            [unit_conversion_id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Unit conversion not found' }, { status: 404 });
        }

        // Begin transaction to ensure atomicity
        await connection.beginTransaction();

        // Update the unit conversion in the database
        const query = `UPDATE unit_conversions SET status = ?, updatedAt = NOW() WHERE conversion_id = ?`;
        const [result] = await connection.execute(query, [ACTIVE_ITEM, unit_conversion_id]);

        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            await connection.rollback();
            return NextResponse.json({ message: 'No changes made' }, { status: 200 });
        }

        // Look for reciprocal conversion
        const [reciprocalConversions] = await connection.execute(
            `SELECT * FROM unit_conversions WHERE from_unit = ? AND to_unit = ?`,
            [rows[0].to_unit, rows[0].from_unit]
        );

        // If reciprocal conversion exists, restore it
        if (reciprocalConversions.length > 0) {
            const reciprocalId = reciprocalConversions[0].conversion_id;

            await connection.execute(
                `UPDATE unit_conversions SET status = ?, updatedAt = NOW() WHERE conversion_id = ?`,
                [ACTIVE_ITEM, reciprocalId]
            );
        }

        // Commit transaction
        await connection.commit();

        // Return a success response
        return NextResponse.json({
            message: 'Unit conversion and its reciprocal (if exists) restored successfully',
            unit_conversion_id,
            status: 'restored',
        });
    } catch (error) {
        console.error('Error restoring unit conversion:', error);

        // Rollback the transaction on error
        await connection.rollback();

        return NextResponse.json({ message: 'Failed to restore unit conversion', error: error.message }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
