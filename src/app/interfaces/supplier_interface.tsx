// Data Type Object for Supplier

export default interface SupplierInterface {
    _id: string;
    name: string;
    addresses: string[]; // Array of addresses
    contactnos: string[]; // Array of contact numbers
    emails: string[]; // Array of email addresses
    websites: string[]; // Array of website URLs
    description: string;
    other_parameters: { parameter_name: string; value: string }[]; // Array of key-value pairs
    item_ids: string[]; // Array of item IDs
}