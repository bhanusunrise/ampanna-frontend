import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Item from '@/app/models/item_model';

type CreateItemBody = {
  name: string;
  description?: string;
  main_unit_id: string;
  other_unit_ids?: string[];
  other_parameters?: Array<{ parameter_name: string; value: string }>;
  barcode?: string;
};

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the incoming JSON data
    const body = (await request.json()) as CreateItemBody;

    const {
      name,
      description,
      main_unit_id,
      other_unit_ids,
      other_parameters,
      barcode,
    } = body;

    // Validate required fields except `_id`
    if (!name || !main_unit_id) {
      return NextResponse.json(
        { success: false, message: 'Item Name and Main Unit ID are required' },
        { status: 400 } // Bad Request
      );
    }

    // Check if barcode already exists
    if (barcode) {
      const existingItem = await Item.findOne({ barcode }).lean();
      if (existingItem) {
        return NextResponse.json(
          { success: false, message: 'Barcode must be unique' },
          { status: 400 } // Bad Request
        );
      }
    }

    // Normalize arrays from body
    const rawOtherUnitIds: string[] = Array.isArray(other_unit_ids) ? other_unit_ids : [];
    const safeMainUnitId = String(main_unit_id);

    // Remove `main_unit_id` from `other_unit_ids` if present (typed callback)
    const filteredOtherUnitIds = rawOtherUnitIds.filter(
      (unitId: string) => unitId !== safeMainUnitId
    );

    // Get all documents to calculate the max numeric _id
    const allItems = (await Item.find({}, { _id: 1 }).lean()) as Array<{ _id: string }>;
    const maxId = allItems.reduce((max, doc) => {
      const idNum = parseInt(doc._id, 10);
      return Number.isFinite(idNum) && idNum > max ? idNum : max;
    }, 0);
    const newId = String(maxId + 1);

    // Create a new Item object
    const newItem = new Item({
      _id: newId,
      name,
      description,
      main_unit_id: safeMainUnitId,
      other_unit_ids: filteredOtherUnitIds,
      other_parameters: Array.isArray(other_parameters) ? other_parameters : [],
      barcode,
    });

    // Save the object to the database
    const savedItem = await newItem.save();

    // Return the saved object as a response
    return NextResponse.json({ success: true, data: savedItem }, { status: 201 });
  } catch (error: any) {
    if (error?.code === 11000) {
      // Duplicate key error (e.g., unique index on name)
      return NextResponse.json(
        { success: false, message: 'Item Name must be unique' },
        { status: 400 }
      );
    }
    console.error('Error adding new Item:', error);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
