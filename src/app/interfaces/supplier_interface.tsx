// Data Type Object for Supplier

export default interface SupplierInterface {
    _id: string;
    name: string;
    addresses: string[]; // Array of addresses
    contactnos: number[]; // Array of contact numbers
    emails: string[]; // Array of email addresses
    websites: string[]; // Array of website URLs
    description: string;
}