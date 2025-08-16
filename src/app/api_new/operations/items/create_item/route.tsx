import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Item from '@/app/models/item_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        const { name, description, main_unit_id, other_unit_ids, other_parameters, barcode } = body;

        // Validate required fields except `_id`
        if (!name || !main_unit_id) {
            return NextResponse.json(
                { success: false, message: 'Item Name and Main Unit ID are required' },
                { status: 400 } // Bad Request
            );
        }

        // Check if barcode already exists
        if (barcode) {
            const existingItem = await Item.findOne({ barcode });
            if (existingItem) {
                return NextResponse.json(
                    { success: false, message: 'Barcode must be unique' },
                    { status: 400 } // Bad Request
                );
            }
        }

        // Remove `main_unit_id` from `other_unit_ids` if present
        const filteredOtherUnitIds = other_unit_ids.filter(unitId => unitId !== main_unit_id);


        // Get all documents to calculate the max numeric _id
                const allItems = await Item.find({});
                const maxId = allItems.reduce((max, doc) => {
                    const idNum = parseInt(doc._id);
                    return idNum > max ? idNum : max;
                }, 0);
                const newId = (maxId + 1).toString();
        
                console.log('New ID:', newId); // Debug log

        // Create a new Item object
        const newItem = new Item({
            _id: newId.toString(),
            name,
            description,
            main_unit_id,
            other_unit_ids : filteredOtherUnitIds,
            other_parameters,
            barcode,
        });

        // Save the object to the database
        const savedItem = await newItem.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedItem },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Item Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Item:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later.' },
            { status: 500 }
        );
    }
}