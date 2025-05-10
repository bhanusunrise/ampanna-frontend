import mongoose, { Schema, Document } from 'mongoose';
import ItemInterface from '../interfaces/item_interface';

// Extend the imported interface to include Document
export interface IItem extends Omit<ItemInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

// Define the Item schema
const ItemSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        name: { type: String, required: true, unique: true }, // Item name must be unique
        description: { type: String, required: false },
        main_unit_id: { type: String, required: true }, // Reference to the main unit ID
        other_unit_ids: { type: [String], required: false }, // Array of unit IDs
        category: { type: String, required: false }, // Category of the item
        main_unit_name: { type: String, required: false }, // Name of the main unit (optional)
        other_unit_names: { type: [String], required: false }, // Array of names for other units (optional)
        barcode: { type: String, required: false }, // Barcode for the item (optional)
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