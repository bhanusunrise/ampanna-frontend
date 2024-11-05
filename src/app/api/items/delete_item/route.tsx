import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function PUT(req: Request) {
  const db = await dbConnect();
  const { item_id } = await req.json();

  try {
    // Update the status of the item to "අක්‍රීය" in the Items table
    const updateStatusQuery = `
      UPDATE Items
      SET status = 'අක්‍රීය', updatedAt = NOW()
      WHERE item_id = ?
    `;
    const [result] = await db.execute(updateStatusQuery, [item_id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
    }

    // Optionally, you can also update the status of related item units to "අක්‍රීය"
    const updateUnitStatusQuery = `
      UPDATE ItemUnits
      SET status = 'අක්‍රීය', updatedAt = NOW()
      WHERE item_id = ?
    `;
    await db.execute(updateUnitStatusQuery, [item_id]);

    return NextResponse.json({ message: 'Item marked as inactive successfully.' });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
  }
}
