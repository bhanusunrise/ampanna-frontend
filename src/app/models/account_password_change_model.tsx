import mongoose, { Schema, Document } from 'mongoose';
import { AccountInterface } from '../interfaces/account_interface';

export interface IAccountPasswordChange extends Omit<AccountInterface, '_id'>, Document {
  _id: string;
  email: string;
  password: string;
  retype_password: string;
}

const AccountPasswordChangeSchema: Schema = new Schema(
  {
    _id: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    retype_password: { type: String, required: true },
  },
  { collection: 'accounts' }
);

export default mongoose.models.AccountPasswordChange ||
  mongoose.model<IAccountPasswordChange>('AccountPasswordChange', AccountPasswordChangeSchema);

