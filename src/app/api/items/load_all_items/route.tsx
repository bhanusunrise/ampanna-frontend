import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import { NULL_VALUE } from '@/app/constants/constants';

export async function GET() {
  const db = await dbConnect();

  try {
    // Fetch all items
    const itemsQuery = `
      SELECT i.item_id, 
       i.item_name, 
       i.item_category_id, 
       i.createdAt, 
       i.updatedAt, 
       i.item_barcode, 
       i.status,
       ic.category_name AS item_category_name
FROM Items i
LEFT JOIN Item_Categories ic ON i.item_category_id = ic.category_id
ORDER BY i.item_id DESC;
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
    interface Item {
      item_id: number;
      item_name: string;
      item_category_id: number;
      createdAt: Date;
      updatedAt: Date;
      item_barcode: string | null;
      status: string;
      item_category_name: string;
    }

    interface ItemUnit {
      item_id: number;
      unit_id: number;
      unit_name: string;
      abbreviation: string;
      default_status: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }

    const itemsWithUnits = items.map((item: Item) => {
      const units = itemUnits.filter((unit: ItemUnit) => unit.item_id === item.item_id);

      // Set item_barcode to "N/A" if it is null
      const itemWithBarcode = {
        ...item,
        item_barcode: item.item_barcode || NULL_VALUE,
        units,
      };

      return itemWithBarcode;
    });

    return NextResponse.json(itemsWithUnits);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
  }
}
