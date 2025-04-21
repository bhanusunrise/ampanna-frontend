import mongoose, { Schema, Document } from 'mongoose';
import { CashPlatformInterface } from '../interfaces/cash_platform_interface';

// Define an interface for the CashPlatform model
// Extend the imported interface to include Document
export interface ICashPlatform extends Omit<CashPlatformInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
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