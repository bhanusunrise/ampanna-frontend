import mongoose, { Schema, Document } from 'mongoose';
import StockInterface from '../interfaces/stock_interface';

// Extend the imported interface to include Document
export interface IStock extends Omit<StockInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
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
                start_date: { type: Date, required: false }, // Discount start date
                end_date: { type: Date, required: false }, // Discount end date
                percentage: { type: Number, required: false }, // Discount percentage
            },
        ],
        supplier_name: { type: String, required: false }, // Name of the supplier
        item_name: { type: String, required: false }, // Name of the item
    },
    { collection: 'stocks' } // Explicitly set collection name
);

// Export the Stock model
export default mongoose.models.Stock || mongoose.model<IStock>('Stock', StockSchema);