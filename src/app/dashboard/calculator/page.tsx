'use client';

import SearchInput from "@/app/components/Forms/calculator/search_input";
import NumberInput from "@/app/components/Forms/number_input";
import TextInput from "@/app/components/Forms/text_input";
import { CALCULATOR_PAGE_NAME, CALCULATOR_TABLE_FIELDS, ITEMS_API, ITEMS_PAGE_NAME, ITEMS_SEARCH_PLACEHOLDER, SEARCH, STOCKS_API } from "@/app/constants/constants";
import { BillInterface } from "@/app/interfaces/bill_interface";
import ItemInterface from "@/app/interfaces/item_interface";
import StockInterface from "@/app/interfaces/stock_interface";
import UnitInterface from "@/app/interfaces/unit_interface";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";



function CalculatorPage() {
  const [selectedItem, setSelectedItem] = useState<ItemInterface | null>(null);
  const [bill, setBill] = useState<BillInterface | null>(null);
  const [stocks, setStocks] = useState<StockInterface[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockInterface | null>(null);
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [selectedSubtotal, setSelectedSubtotal] = useState<number>(0);
  const [totalUnitDiscounts, setTotalUnitDiscounts] = useState<number>(0);
  const [totalRowDiscounts, setTotalRowDiscounts] = useState<number>(0);


  const fetchStocksForSelectedItem = async () => {
    if (!selectedItem?._id) return;
    try {
      const response = await fetch(`${STOCKS_API}fetch_all_stocks?item_id=${selectedItem._id}`);
      const jsonResponse = await response.json();
  
      if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
        setStocks(jsonResponse.data);
        setSelectedStock(jsonResponse.data[0]);
        setSelectedAmount(1);
      } else {
        setStocks([]); // Ensure stocks is always an array
      }
    } catch (error) {
      console.error("Error fetching selected stock:", error);
      setStocks([]); // Handle errors gracefully
    }
  };


  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    console.log("Selected value:", e.target.value);
    const newStock = stocks.find(stock => stock._id === e.target.value) || null;
    setSelectedStock(newStock);
    handleAmountChange();

  };

  const handleAmountChange = () => {
    const newSubtotal = selectedStock?.selling_price * selectedAmount || 0;
    setSelectedSubtotal(newSubtotal);
  
    const newUnitDiscounts = selectedStock?.discount.reduce((acc, discount) => acc + discount.percentage, 0) || 0;
    setTotalUnitDiscounts(newUnitDiscounts);
  
    const newRowDiscounts = newUnitDiscounts * selectedAmount;
    setTotalRowDiscounts(newRowDiscounts);
  }
  

  useEffect(() => {
    fetchStocksForSelectedItem();
  }, [selectedItem]);

  useEffect(() => {
    console.log("selected stock:", selectedStock); // Will now log correctly
  }, [selectedStock]);
  
  useEffect(() => {
    handleAmountChange();

    console.log("selected amount:", selectedAmount); // Will now log correctly
  }, [selectedAmount]);

  useEffect(() => {
    console.log("selected subtotal:", selectedSubtotal); // Will now log correctly
  }, [selectedSubtotal]);


  useEffect(() => {

    setSelectedSubtotal(selectedStock?.selling_price * selectedAmount || 0);
    if (!selectedStock?.discount) return; // Ensure selectedStock and discount exist
  
    const today = new Date();
  
    // Filter discounts that are valid today
    const applicableDiscounts = selectedStock.discount.filter(discount => {
      const startDate = new Date(discount.start_date);
      const endDate = new Date(discount.end_date);
      return today >= startDate && today <= endDate;
    });
  
    // Sum up the discount amounts
    const totalDiscount = applicableDiscounts.reduce((acc, discount) => acc + discount.percentage, 0);
    
    setTotalUnitDiscounts(totalDiscount);
    setTotalRowDiscounts(totalDiscount * selectedAmount);
  }, [selectedStock]); // Runs when selectedStock changes
  

  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h3 className='text-primary'>{CALCULATOR_PAGE_NAME}</h3>
        
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <SearchInput
            label={SEARCH}
            form_id="search"
            placeholder_text={ITEMS_SEARCH_PLACEHOLDER}
            onSelectItem={(item: ItemInterface) => {
              setSelectedItem(item);
              fetchStocksForSelectedItem();
              setSelectedAmount(1);
              setSelectedSubtotal(selectedAmount * selectedStock?.selling_price || 0);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {CALCULATOR_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{selectedItem?.name}</td>
              <td>
                <select className="form-select" onChange={handleStockChange} value={selectedStock?._id}>
          
                  {stocks.length === 0 ? (
                    <option value="">Cannot find a stock</option>
                    ) : (
                      stocks.map((stock, index) => (
                        <option key={index} value={stock._id}>{stock.name}</option>
                    ))
                  )}

                </select>
              </td>
              <td>
                  {selectedStock?.selling_price.toString() || '0'}
              </td>
              <td>
                  {totalUnitDiscounts.toString() || '0'}
              </td>
              <td>
                <select className="form-select" onChange={handleAmountChange}>
                   <option value={selectedItem?.main_unit_id} selected>{selectedItem?.main_unit_name}</option>
                  {selectedItem?.other_unit_ids.map((item, index) => (
                    <option key={index} value={item}>{selectedItem.other_unit_names?.[index] || item}</option>
                  ))}
                </select>
              </td>
              <td>
                <NumberInput
                  form_id="quantity"
                  placeholder_text="0"
                  value={selectedAmount}
                  min_value={1}
                  onChangeText={(e) => {setSelectedAmount(Number(e.target.value)); handleAmountChange();}}
                  onLoad={() => {setSelectedAmount(1)}}
                />
              </td>
              <td>{selectedSubtotal }</td>
              <td>{totalRowDiscounts}</td>
              <td>{selectedSubtotal - totalRowDiscounts}</td>
            </tr>
          </tbody>

          </Table>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default CalculatorPage;