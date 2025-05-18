'use client';

import { useState } from "react";
import { CalculatorRow } from "@/app/interfaces/tables/calculator_row_interface";
import { CALCULATOR_TABLE_FIELDS, ITEMS_SEARCH_PLACEHOLDER, SEARCH, STOCKS_API, UNIT_CONVERSION_API } from "@/app/constants/constants";
import ItemInterface from "@/app/interfaces/item_interface";
import SearchInput from "@/app/components/Forms/calculator/search_input";
import { Table } from "react-bootstrap";
import NumberInput from "@/app/components/Forms/number_input";
import UnitConversionInterface from "@/app/interfaces/unit_conversion_interface";

function CalculatorPage() {
  const [rows, setRows] = useState<CalculatorRow[]>([]);

  const handleItemSelect = async (item: ItemInterface) => {
    try {
      const response = await fetch(`${STOCKS_API}fetch_all_stocks?item_id=${item._id}`);
      const jsonResponse = await response.json();

      if (jsonResponse.success && Array.isArray(jsonResponse.data) && jsonResponse.data.length > 0) {
        const allStocks = jsonResponse.data;
        const defaultStock = allStocks[0];
        const today = new Date();

        const applicableDiscounts = defaultStock.discount.filter(discount => {
          const startDate = new Date(discount.start_date);
          const endDate = new Date(discount.end_date);
          return today >= startDate && today <= endDate;
        });

        const totalUnitDiscount = applicableDiscounts.reduce((acc, discount) => acc + discount.percentage, 0);
        const amount = 1;
        const subtotal = defaultStock.selling_price * amount;
        const rowDiscount = totalUnitDiscount * amount;

        const newRow: CalculatorRow = {
            item,
            stock: defaultStock,
            allStocks,
            amount,
            subtotal,
            unitDiscount: totalUnitDiscount,
            rowDiscount,
            baseSellingPrice: defaultStock.selling_price,
            unitId: item.main_unit_id, // track current selected unit
          };
          

        setRows(prev => [...prev, newRow]);
      }
    } catch (error) {
      console.error("Error fetching stock for item:", error);
    }
  };

  return (
    <>
      <SearchInput
        label={SEARCH}
        form_id="search"
        placeholder_text={ITEMS_SEARCH_PLACEHOLDER}
        onSelectItem={handleItemSelect}
      />

      <Table bordered hover>
        <thead>
          <tr>
            {CALCULATOR_TABLE_FIELDS.map((field, index) => (
              <th key={index} className="text-primary">{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.item.name}</td>
              <td>
                <select
                  className="form-select"
                  value={row.stock?._id}
                  onChange={(e) => {
                    const selectedStock = row.allStocks.find(s => s._id === e.target.value);
                    if (!selectedStock) return;

                    const today = new Date();
                    const applicableDiscounts = selectedStock.discount.filter(discount => {
                      const start = new Date(discount.start_date);
                      const end = new Date(discount.end_date);
                      return today >= start && today <= end;
                    });

                    const unitDiscount = applicableDiscounts.reduce((acc, d) => acc + d.percentage, 0);
                    const subtotal = selectedStock.selling_price * row.amount;
                    const rowDiscount = unitDiscount * row.amount;

                    const updatedRow: CalculatorRow = {
                      ...row,
                      stock: selectedStock,
                      unitDiscount,
                      subtotal,
                      rowDiscount,
                    };

                    setRows(prev => {
                      const newRows = [...prev];
                      newRows[index] = updatedRow;
                      return newRows;
                    });
                  }}
                >
                  {row.allStocks.map((stock, i) => (
                    <option key={i} value={stock._id}>{stock.name}</option>
                  ))}
                </select>
              </td>
              <td>{row.stock?.selling_price || 0}</td>
              <td>{row.unitDiscount}</td>
              <td>
              <select
  className="form-select"
  value={row.unitId || row.item.main_unit_id}
  onChange={async (e) => {
    const selectedUnitId = e.target.value;
    let adjustedPrice = row.baseSellingPrice;

    if (selectedUnitId !== row.item.main_unit_id) {
      try {
        const response = await fetch(
          `${UNIT_CONVERSION_API}fetch_all_unit_conversions?first_unit_id=${row.item.main_unit_id}&second_unit_id=${selectedUnitId}`
        );
        const json = await response.json();

        if (json.success && json.data.length > 0) {
          const multiplier = json.data[0].multiplier;
          adjustedPrice = row.baseSellingPrice / multiplier;
        } else {
          console.warn("Conversion not found. Falling back to base price.");
        }
      } catch (err) {
        console.error("Error fetching conversion:", err);
      }
    }

    const newSubtotal = adjustedPrice * row.amount;
    const newRowDiscount = row.unitDiscount * row.amount;

    const updatedRow = {
      ...row,
      unitId: selectedUnitId,
      stock: {
        ...row.stock,
        selling_price: adjustedPrice,
      },
      subtotal: newSubtotal,
      rowDiscount: newRowDiscount,
    };

    // ✅ Update rows state
    setRows((prev) => {
      const newRows = [...prev];
      newRows[index] = updatedRow;
      return newRows;
    });
  }}
>
  <option value={row.item.main_unit_id}>{row.item.main_unit_name}</option>
  {row.item.other_unit_ids.map((id, i) => (
    <option key={i} value={id}>{row.item.other_unit_names?.[i] || id}</option>
  ))}
</select>


              </td>
              <td>
                <NumberInput
                  form_id={`quantity-${index}`}
                  placeholder_text="0"
                  value={row.amount}
                  min_value={1}
                  onChangeText={(e) => {
                    const newAmount = Number(e.target.value);
                    const subtotal = (row.stock?.selling_price || 0) * newAmount;
                    const rowDiscount = row.unitDiscount * newAmount;

                    const updatedRow = {
                      ...row,
                      amount: newAmount,
                      subtotal,
                      rowDiscount,
                    };

                    setRows(prev => {
                      const newRows = [...prev];
                      newRows[index] = updatedRow;
                      return newRows;
                    });
                  }}
                />
              </td>
              <td>{row.subtotal}</td>
              <td>{row.rowDiscount}</td>
              <td>{row.subtotal - row.rowDiscount}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setRows(prev => prev.filter((_, i) => i !== index));
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CalculatorPage;
