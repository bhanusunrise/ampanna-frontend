import mongoose, { Schema, Document } from 'mongoose';
import { BillInterface } from '../interfaces/bill_interface';

// Extend the imported interface to include Document
export interface IBill extends Omit<BillInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

// Define the Bill schema
const BillSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        date: { type: Date, required: true }, // Bill date
        bill_item: [
            {
                _id: { type: String, required: false }, // Unique identifier for the bill item
                stock_id: { type: String, required: true }, // Reference to stock
                quantity: { type: Number, required: true }, // Quantity of the stock item
                discount: { type: Number, required: false }, // Discount percentage
            },
        ],
        additional_discount: { type: Number, required: false, default: 0 }, // Default to 0
    },
    { collection: 'bills' } // Explicitly set collection name
);

// Export the Bill model
export default mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);