import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function PUT(req: Request) {
  const db = await dbConnect();
  const { item_id } = await req.json();

  try {
    // Update the status of the item to "සක්‍රීය" in the Items table
    const restoreItemQuery = `
      UPDATE Items
      SET status = 'සක්‍රීය', updatedAt = NOW()
      WHERE item_id = ?
    `;
    const [result] = await db.execute(restoreItemQuery, [item_id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Item not found or already active.' }, { status: 404 });
    }

    // Optionally, restore the status of related item units to "සක්‍රීය"
    const restoreUnitStatusQuery = `
      UPDATE ItemUnits
      SET status = 'සක්‍රීය', updatedAt = NOW()
      WHERE item_id = ?
    `;
    await db.execute(restoreUnitStatusQuery, [item_id]);

    return NextResponse.json({ message: 'Item restored successfully.' });
  } catch (error) {
    console.error('Error restoring item:', error);
    return NextResponse.json({ error: 'Failed to restore item.' }, { status: 500 });
  }
}
