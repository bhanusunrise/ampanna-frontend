import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Bill model
export interface IBill extends Document {
    _id: string;
    date: Date; // Bill date
    bill_item: { _id: string; stock_id: string; quantity: number }[]; // Array of bill items
    additional_discount: number; // Additional discount applied to the bill
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
            },
        ],
        additional_discount: { type: Number, required: false, default: 0 }, // Default to 0
    },
    { collection: 'bills' } // Explicitly set collection name
);

// Export the Bill model
export default mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);