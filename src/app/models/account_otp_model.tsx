import mongoose, { Schema, Document } from 'mongoose';
import { AccountInterface } from '../interfaces/account_interface';


export interface IAccountOtp extends Omit<AccountInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

const AccountOtpSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        otp_code: { type: Number, required: false },
        is_allowed: { type: Boolean, required:false}
    },
    { collection: 'accounts' } 
);

export default mongoose.models.AccountOtp || mongoose.model<IAccountOtp>('AccountOtp', AccountOtpSchema);