import mongoose, { Schema, Document } from 'mongoose';

export interface IUnit extends Document {
    _id: string;
    unit_category_id: string;
    unit_name: string;
    description: string;
}

const UnitSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        unit_category_id: { type: String, required: true },
        unit_name: { type: String, required: true, unique: true },
        description: { type: String, required: false },
    },
    { collection: 'units' } // Explicitly set collection name
);

export default mongoose.models.Unit || mongoose.model<IUnit>('Unit', UnitSchema);