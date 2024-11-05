import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function POST(req: Request) {
  const db = await dbConnect();
  const { item_category_id, item_name, units } = await req.json();

  try {
    // Generate the next item ID based on the last inserted ID
    const lastIdQuery = `SELECT item_id FROM Items ORDER BY item_id DESC LIMIT 1`;
    const [rows] = await db.execute(lastIdQuery);
    const lastId = rows.length > 0 ? rows[0].item_id : null;

    const item_id = generateNextItemId(lastId);

    // Insert into Items table
    const insertItemQuery = `
      INSERT INTO Items (item_id, item_name, item_category_id, createdAt, updatedAt)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    await db.execute(insertItemQuery, [item_id, item_name, item_category_id]);

    // Insert associated units into ItemUnits table
    const insertUnitQuery = `
      INSERT INTO ItemUnits (item_id, unit_id, createdAt, updatedAt, status, default_status)
      VALUES (?, ?, NOW(), NOW(), 'සක්‍රීය', ?)
    `;
    for (const unit of units) {
      const defaultStatus = unit.default_status || 'අවශ්‍ය';
      await db.execute(insertUnitQuery, [item_id, unit.unit_id, defaultStatus]);
    }

    return NextResponse.json({ message: 'Item and units inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Failed to insert data.' }, { status: 500 });
  }
}

// Helper function to generate the next item ID
function generateNextItemId(lastId: string | null) {
  if (!lastId) return 'ITEM01';

  const lastNumber = parseInt(lastId.replace('ITEM', ''));
  const nextNumber = (lastNumber + 1).toString().padStart(2, '0');
  return `ITEM${nextNumber}`;
}
