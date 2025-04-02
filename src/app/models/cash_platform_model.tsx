import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the CashPlatform model
export interface ICashPlatform extends Document {
    _id: string;
    name: string;
    description: string;
    transaction: { _id: string; description: string; is_in: boolean; amount: number }[]; // Array of transactions
    is_loan: boolean; // Indicates if the cash platform involves a loan
}

// Define the CashPlatform schema
const CashPlatformSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Unique and required name of the cash platform
        description: { type: String, required: false }, // Optional description
        transaction: [
            {
                _id: { type: String, required: false }, // Transaction ID
                description: { type: String, required: true }, // Description of the transaction
                is_in: { type: Boolean, required: true }, // Boolean indicating cash inflow (true) or outflow (false)
                amount: { type: Number, required: true }, // Amount involved in the transaction
            },
        ], // Array of transactions
        is_loan: { type: Boolean, required: true }, // Indicates if the platform involves loans
    },
    { collection: 'cash_platforms' } // Explicitly set collection name
);

// Export the CashPlatform model
export default mongoose.models.CashPlatform || mongoose.model<ICashPlatform>('CashPlatform', CashPlatformSchema);