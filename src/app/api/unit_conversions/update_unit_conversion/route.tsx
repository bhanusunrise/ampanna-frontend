import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function PUT(req: Request) {
    const connection = await dbConnect();

    try {
        // Parse the incoming request data (assumes JSON input)
        const body = await req.json();
        const { conversionId, newMultiplier } = body;

        // Validate input
        if (!conversionId || newMultiplier === undefined || newMultiplier <= 0) {
            return NextResponse.json({ message: 'Invalid input: Provide a valid conversion ID and a positive multiplier' }, { status: 400 });
        }

        // Check if the conversion exists
        const [existingConversions] = await connection.execute(
            `SELECT * FROM unit_conversions WHERE conversion_id = ?`,
            [conversionId]
        );

        if (existingConversions.length === 0) {
            return NextResponse.json({ message: 'Conversion not found' }, { status: 404 });
        }

        // Begin transaction to ensure atomicity
        await connection.beginTransaction();

        // Update the multiplier for the specified conversion
        await connection.execute(
            `UPDATE unit_conversions SET value = ?, updatedAt = NOW() WHERE conversion_id = ?`,
            [newMultiplier, conversionId]
        );

        // Update the reciprocal conversion if it exists
        const [reciprocalConversions] = await connection.execute(
            `SELECT * FROM unit_conversions WHERE from_unit = ? AND to_unit = ?`,
            [existingConversions[0].to_unit, existingConversions[0].from_unit]
        );

        if (reciprocalConversions.length > 0) {
            const reciprocalId = reciprocalConversions[0].conversion_id;
            const reciprocalValue = 1 / newMultiplier;

            await connection.execute(
                `UPDATE unit_conversions SET value = ?, updatedAt = NOW() WHERE conversion_id = ?`,
                [reciprocalValue, reciprocalId]
            );
        }

        // Commit transaction
        await connection.commit();

        // Return a success response
        return NextResponse.json({
            message: 'Conversion multiplier updated successfully',
            conversionId,
            newMultiplier,
        });
    } catch (error) {
        console.error('Error updating conversion multiplier:', error);

        // Rollback the transaction on error
        await connection.rollback();

        return NextResponse.json({ message: 'Failed to update conversion multiplier', error: error.message }, { status: 500 });
    } finally {
        await connection.end(); // Close the connection after use
    }
}
