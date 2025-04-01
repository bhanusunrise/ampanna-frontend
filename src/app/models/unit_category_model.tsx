import mongoose, { Schema, Document } from 'mongoose';

export interface IUnitCategory extends Document {
    _id: string;
    unit_category_name: string;
    description: string;
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