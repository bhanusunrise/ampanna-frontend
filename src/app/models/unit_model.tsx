import mongoose, { Schema, Document } from 'mongoose';
import UnitInterface from '../interfaces/unit_interface';

// Extend the imported interface to include Document
export interface IUnit extends Omit<UnitInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

const UnitSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        unit_category_id: { type: String, required: true },
        unit_category_name: { type: String, required: false },
        unit_name: { type: String, required: true, unique: true },
        description: { type: String, required: false },
    },
    { collection: 'units' } // Explicitly set collection name
);

export default mongoose.models.Unit || mongoose.model<IUnit>('Unit', UnitSchema);