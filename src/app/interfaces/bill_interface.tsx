// Data Type Object for Bill

export interface BillInterface {
    _id: string;
    date: Date; // Bill date
    bill_item: { _id: string; stock_id: string; unit_id : string; quantity: number; discount: number }[]; // Array of bill items
    additional_discount: number; // Additional discount applied to the bill
}