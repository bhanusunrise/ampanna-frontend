import ItemInterface from "../item_interface";
import StockInterface from "../stock_interface";

export interface CalculatorRow {
    item: ItemInterface;
    stock: StockInterface | null;
    allStocks: StockInterface[];
    amount: number;
    subtotal: number;
    unitDiscount: number;
    rowDiscount: number;
    selectedUnitId: string;
    conversionMultiplier: number;
    unitId?: string
    baseSellingPrice: number;
  }
  