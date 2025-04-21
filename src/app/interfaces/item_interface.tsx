// Data Type Object for Item

export default interface ItemInterface {
   _id: string;
    name: string;
    description: string;
    main_unit_id: string;
    other_unit_ids: string[]; // Array of unit IDs (strings)
    other_parameters: { parameter_name: string; value: string }[]; // Array of objects for parameter details
}