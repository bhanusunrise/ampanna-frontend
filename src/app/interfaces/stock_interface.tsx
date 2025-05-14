// Data Type Object for Stock 

export default interface StockInterface {
    _id: string;
    name: string;
    description: string;
    supplier_id: string; // Reference to supplier
    item_id: string; // Reference to item
    date: Date; // Date for stock entry
    total_quantity: number;
    sold_quantity: number;
    damaged_quantity: number;
    buying_price: number; // Price per unit
    selling_price: number; // Price per unit
    discount: { _id: string; start_date: Date; end_date: Date; percentage: number }[]; // Array of discount objects
}