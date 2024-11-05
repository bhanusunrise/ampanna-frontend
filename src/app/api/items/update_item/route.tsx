import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function PUT(req: Request) {
  const db = await dbConnect();
  const { item_id, item_name, default_unit_id } = await req.json();

  try {
    // Update the item name in the Items table
    const updateItemQuery = `
      UPDATE Items
      SET item_name = ?, updatedAt = NOW()
      WHERE item_id = ?
    `;
    await db.execute(updateItemQuery, [item_name, item_id]);

    // If default_unit_id is provided, update default_status in ItemUnits table
    if (default_unit_id) {
      // Reset default_status for all units of the item to "අවශ්‍ය"
      const resetDefaultStatusQuery = `
        UPDATE ItemUnits
        SET default_status = 'අවශ්‍ය', updatedAt = NOW()
        WHERE item_id = ?
      `;
      await db.execute(resetDefaultStatusQuery, [item_id]);

      // Set default_status to "අත්‍යාවශ්‍ය" for the specified default_unit_id
      const setDefaultStatusQuery = `
        UPDATE ItemUnits
        SET default_status = 'අත්‍යාවශ්‍ය', updatedAt = NOW()
        WHERE item_id = ? AND unit_id = ?
      `;
      await db.execute(setDefaultStatusQuery, [item_id, default_unit_id]);
    }

    return NextResponse.json({ message: 'Item and default unit updated successfully.' });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
  }
}
