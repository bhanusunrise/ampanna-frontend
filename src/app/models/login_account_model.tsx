import mongoose, { Schema, Document } from 'mongoose';
import { AccountInterface } from '../interfaces/account_interface';

// Extend the imported interface for updating an account
export interface ILoginAccount extends Omit<AccountInterface, '_id'>, Document {
    _id: string;
}

// Define the UpdateAccount schema
const LoginAccountSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true },
        password : { type: String, required: true },
        token : { type: String, required: false },
        is_allowed: { type: Boolean, required: false },
        is_master: { type: Boolean, required: false },
    },
    { collection: 'accounts' } // Using the same collection
);

// Export the UpdateAccount model
export default mongoose.models.LoginAccount || mongoose.model<ILoginAccount>('LoginAccount', LoginAccountSchema);