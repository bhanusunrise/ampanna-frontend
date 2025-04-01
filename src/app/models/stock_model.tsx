import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Stock model
export interface IStock extends Document {
    _id: string;
    name: string;
    description: string;
    supplier_id: string; // Reference to supplier
    item_id: string; // Reference to item
    date: Date; // Date for stock entry
    total_quantity: number;
    sold_quantity: number;
    damaged_quantity: number;
    buying_price: number; // Price per unit
    selling_price: number; // Price per unit
    discount: { _id: string; start_date: Date; end_date: Date }[]; // Array of discount objects
}

// Define the Stock schema
const StockSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Stock name must be unique
        description: { type: String, required: false },
        supplier_id: { type: String, required: true }, // Reference to supplier
        item_id: { type: String, required: true }, // Reference to item
        date: { type: Date, required: true }, // Date for stock entry
        total_quantity: { type: Number, required: true },
        sold_quantity: { type: Number, required: false, default: 0 }, // Default to 0
        damaged_quantity: { type: Number, required: false, default: 0 }, // Default to 0
        buying_price: { type: Number, required: true },
        selling_price: { type: Number, required: true },
        discount: [
            {
                _id: { type: String, required: false }, // ID for the discount
                start_date: { type: Date, required: true }, // Discount start date
                end_date: { type: Date, required: true }, // Discount end date
            },
        ],
    },
    { collection: 'stocks' } // Explicitly set collection name
);

// Export the Stock model
export default mongoose.models.Stock || mongoose.model<IStock>('Stock', StockSchema);