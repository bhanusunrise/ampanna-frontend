import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Item model
export interface IItem extends Document {
    _id: string;
    name: string;
    description: string;
    main_unit_id: string;
    other_unit_ids: string[]; // Array of unit IDs (strings)
    other_parameters: { parameter_name: string; value: string }[]; // Array of objects for parameter details
}

// Define the Item schema
const ItemSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Item name must be unique
        description: { type: String, required: false },
        main_unit_id: { type: String, required: true }, // Reference to the main unit ID
        other_unit_ids: { type: [String], required: false }, // Array of unit IDs
        other_parameters: [
            {
                parameter_name: { type: String, required: false }, // Parameter name
                value: { type: String, required: false }, // Parameter value
            },
        ],
    },
    { collection: 'items' } // Explicitly set collection name
);

// Export the Item model
export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);