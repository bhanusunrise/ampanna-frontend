import mongoose, { Schema, Document } from 'mongoose';
import UnitCategoryInterface from '../interfaces/unit_category_interface'; // Adjust the path as needed

// Extend the imported interface to include Document
export interface IUnitCategory extends Omit<UnitCategoryInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

const UnitCategorySchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        unit_category_name: { type: String, required: true, unique: true },
        description: { type: String, required: false },
    },
    { collection: 'unit_categories' } // Explicitly set collection name
);

export default mongoose.models.UnitCategory || mongoose.model<IUnitCategory>('UnitCategory', UnitCategorySchema);