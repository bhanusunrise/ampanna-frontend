// Data Type Object for Cash Platform 

export interface CashPlatformInterface {
     _id: string;
    name: string;
    description: string;
    transaction: { _id: string; description: string; is_in: boolean; amount: number }[]; // Array of transactions
    is_loan: boolean; // Indicates if the cash platform involves a loan
}