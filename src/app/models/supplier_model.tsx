import mongoose, { Schema, Document } from 'mongoose';
import SupplierInterface from '../interfaces/supplier_interface';

// Extend the imported interface to include Document
export interface ISupplier extends Omit<SupplierInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

// Define the Supplier schema
const SupplierSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Supplier name must be unique
        addresses: { type: [String], required: false }, // List of addresses
        contactnos: { type: [String], required: false }, // List of contact numbers
        emails: { type: [String], required: false }, // List of email addresses
        websites: { type: [String], required: false }, // List of website URLs
        description: { type: String, required: false },
        other_parameters: [
            {
                parameter_name: { type: String, required: true }, // Parameter name
                value: { type: String, required: true }, // Parameter value
            },
        ], // Array of other parameters (key-value pairs)
        item_ids: { type: [String], required: false }, // List of item IDs associated with the supplier
    },
    { collection: 'suppliers' } // Explicitly set collection name
);

// Export the Supplier model
export default mongoose.models.Supplier || mongoose.model<ISupplier>('Supplier', SupplierSchema);