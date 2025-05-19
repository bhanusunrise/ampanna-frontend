import mongoose, { Schema, Document } from 'mongoose';
import { AccountInterface } from '../interfaces/account_interface';

// Extend the imported interface for updating an account
export interface IUpdateAccount extends Omit<AccountInterface, '_id'>, Document {
    _id: string;
}

// Define the UpdateAccount schema
const UpdateAccountSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        is_allowed: { type: Boolean, required: false },
        is_master: { type: Boolean, required: false },
    },
    { collection: 'accounts' } // Using the same collection
);

// Export the UpdateAccount model
export default mongoose.models.UpdateAccount || mongoose.model<IUpdateAccount>('UpdateAccount', UpdateAccountSchema);