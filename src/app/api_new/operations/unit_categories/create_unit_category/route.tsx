import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UnitCategory from '@/app/models/unit_category_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        // Validate required fields except `_id`
        if (!body.unit_category_name) {
            return NextResponse.json(
                { success: false, message: 'Unit Category Name is required' },
                { status: 400 }
            );
        }

        // Get all documents to calculate the max numeric _id
        const allCategories = await UnitCategory.find({});
        const maxId = allCategories.reduce((max, doc) => {
            const idNum = parseInt(doc._id);
            return idNum > max ? idNum : max;
        }, 0);
        const newId = (maxId + 1).toString();

        console.log('New ID:', newId); // Debug log

        // Create and save the new Unit Category
        const newUnitCategory = new UnitCategory({
            _id: newId,
            unit_category_name: body.unit_category_name,
            description: body.description,
        });

        const savedUnitCategory = await newUnitCategory.save();

        return NextResponse.json(
            { success: true, data: savedUnitCategory },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.code === 11000) {
            // Extract which field caused the duplicate
            const field = Object.keys(error.keyPattern || {})[0];
            const fieldName = field === 'unit_category_name' ? 'Unit Category Name' : 'ID';
            return NextResponse.json(
                { success: false, message: `${fieldName} must be unique.` },
                { status: 400 }
            );
        }

        console.error('Error adding new Unit Category:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later.' },
            { status: 500 }
        );
    }
}
