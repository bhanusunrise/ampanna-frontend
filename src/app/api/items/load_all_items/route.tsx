import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function GET() {
  const db = await dbConnect();

  try {
    // Fetch all items
    const itemsQuery = `
      SELECT i.item_id, i.item_name, i.item_category_id, i.createdAt, i.updatedAt,
             ic.category_name AS item_category_name
      FROM Items i
      LEFT JOIN Item_Categories ic ON i.item_category_id = ic.category_id
    `;
    const [items] = await db.execute(itemsQuery);

    // Fetch all item units, including default_status and status
    const itemUnitsQuery = `
      SELECT iu.item_id, iu.unit_id, u.unit_name, u.abbreviation, 
             iu.default_status, iu.status, iu.createdAt, iu.updatedAt
      FROM ItemUnits iu
      JOIN Units u ON iu.unit_id = u.unit_id
    `;
    const [itemUnits] = await db.execute(itemUnitsQuery);

    // Combine item and unit data
    const itemsWithUnits = items.map((item: any) => {
      const units = itemUnits.filter((unit: any) => unit.item_id === item.item_id);
      return { ...item, units };
    });

    return NextResponse.json(itemsWithUnits);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
  }
}

