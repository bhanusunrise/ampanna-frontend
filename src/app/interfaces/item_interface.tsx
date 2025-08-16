// Data Type Object for Item

export default interface ItemInterface {
   _id: string;
    name: string;
    description: string;
    main_unit_id: string;
    other_unit_ids: string[]; // Array of unit IDs (strings)
    category:string;
    other_parameters: { parameter_name: string; value: string }[]; // Array of objects for parameter details
    main_unit_name: string; // Name of the main unit (optional)
    other_unit_names: string[]; // Array of names for other units (optional)
    barcode : string; // Barcode for the item (optional)
}