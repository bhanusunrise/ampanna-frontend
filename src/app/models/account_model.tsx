import mongoose, { Schema, Document } from 'mongoose';
import { AccountInterface } from '../interfaces/account_interface';

// Extend the imported interface to include Document
export interface IAccount extends Omit<AccountInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

// Define the Bill schema
const AccountSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Unique and required name of the account
        email: { type: String, required: true }, // Optional description
        password: { type: String, required: true }, // Optional description
        retype_password: { type: String, required: true }, // Optional description
        is_allowed : { type: Boolean, required: false }, // Optional description
        is_master : { type: Boolean, required: false }, // Optional description

    },
    { collection: 'accounts' } // Explicitly set collection name
);

// Export the Bill model
export default mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema);