import mongoose, { Schema, Document } from 'mongoose';
import UnitConversionInterface from '../interfaces/unit_conversion_interface';

// Extend the imported interface to include Document
export interface IUnitConversion extends Omit<UnitConversionInterface, '_id'>, Document {
    _id: string; // Ensure compatibility with the Document type
}

const UnitConversionSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        first_unit_id: { type: String, required: true },
        first_unit_name: { type: String, required: false },
        second_unit_id: { type: String, required: true },
        second_unit_name: { type: String, required: false },
        multiplier: { type: Number, required: true },
        description: { type: String, required: false },
    },
    { collection: 'unit_conversions' } // Explicitly set collection name
);

export default mongoose.models.UnitConversion || mongoose.model<IUnitConversion>('UnitConversion', UnitConversionSchema);