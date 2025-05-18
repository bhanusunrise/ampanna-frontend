// Data Type Object for Bill


interface rowInterface {
    id: string;
    stock_id: string;
    quantity: number;
    unit_id: string;
    unit_discount: number;
    total_discount: number;
}

export interface CashierTableInterface {
    rows: rowInterface[];
}