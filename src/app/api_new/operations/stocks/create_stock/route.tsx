import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import Stock from '@/app/models/stock_model';

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the incoming JSON data
        const body = await request.json();

        const {
            name,
            description,
            supplier_id,
            item_id,
            date,
            total_quantity,
            sold_quantity,
            damaged_quantity,
            buying_price,
            selling_price,
            discount,
        } = body;

        // Validate required fields except `_id`
        if (!name || !supplier_id || !item_id || !date || !total_quantity || !buying_price || !selling_price) {
            return NextResponse.json(
                { success: false, message: 'Name, Supplier ID, Item ID, Date, Total Quantity, Buying Price, and Selling Price are required' },
                { status: 400 } // Bad Request
            );
        }

        // Get all documents to calculate the max numeric _id
                        const allStocks = await Stock.find({});
                        const maxId = allStocks.reduce((max, doc) => {
                            const idNum = parseInt(doc._id);
                            return idNum > max ? idNum : max;
                        }, 0);
                        const newId = (maxId + 1).toString();
                
                        console.log('New ID:', newId); // Debug log


        if (discount && discount.startdate && discount.enddate) {
            const formatDate = (dateStr: string) => {
                const dateObj = new Date(dateStr);
                const yyyy = dateObj.getFullYear();
                const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const dd = String(dateObj.getDate()).padStart(2, '0');
                return `${yyyy}/${mm}/${dd}`;
            };
            discount.startdate = formatDate(discount.startdate);
            discount.enddate = formatDate(discount.enddate);
        }

        // Create a new Stock object
        const newStock = new Stock({
            _id: newId.toString(), // Convert number to string to match schema
            name,
            description,
            supplier_id,
            item_id,
            date,
            total_quantity,
            sold_quantity,
            damaged_quantity,
            buying_price,
            selling_price,
            discount,
        });

        // Save the object to the database
        const savedStock = await newStock.save();

        // Return the saved object as a response
        return NextResponse.json(
            { success: true, data: savedStock },
            { status: 201 } // Created
        );
    } catch (error: any) {
        if (error.code === 11000) { // Check for duplicate key error
            return NextResponse.json(
                { success: false, message: 'Stock Name must be unique' },
                { status: 400 } // Bad Request
            );
        }
        console.error('Error adding new Stock:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later. + ' + error },
            { status: 500 }
        );
    }
}