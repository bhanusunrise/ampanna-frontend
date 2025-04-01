import mongoose, { Schema, Document } from 'mongoose';

export interface IUnitConversion extends Document {
    _id: string;
    first_unit_id: string;
    second_unit_id: string;
    multiplier: number;
    description: string;
}

const UnitConversionSchema: Schema = new Schema(
    {
        _id: { type: String, required: false },
        first_unit_id: { type: String, required: true },
        second_unit_id: { type: String, required: true },
        multiplier: { type: Number, required: true },
        description: { type: String, required: false },
    },
    { collection: 'unit_conversions' } // Explicitly set collection name
);

export default mongoose.models.UnitConversion || mongoose.model<IUnitConversion>('UnitConversion', UnitConversionSchema);