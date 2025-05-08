// Data Type Object for Unit Conversion

export default interface UnitConversionInterface {
    _id: string;
    first_unit_id: string;
    first_unit_name: string; 
    second_unit_id: string;
    second_unit_name: string;
    multiplier: number;
    description: string;
}