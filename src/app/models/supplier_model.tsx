import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Supplier model
export interface ISupplier extends Document {
    _id: string;
    name: string;
    addresses: string[]; // Array of addresses
    contactnos: string[]; // Array of contact numbers
    emails: string[]; // Array of email addresses
    websites: string[]; // Array of website URLs
    description: string;
    other_parameters: { parameter_name: string; value: string }[]; // Array of key-value pairs
    item_ids: string[]; // Array of item IDs
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