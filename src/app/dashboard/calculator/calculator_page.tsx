'use client';

import { useEffect, useState } from "react";
import { CalculatorRow } from "@/app/interfaces/tables/calculator_row_interface";
import {
  CALCULATOR_TABLE_FIELDS,
  ITEMS_SEARCH_PLACEHOLDER,
  SEARCH,
  STOCKS_API,
  UNIT_CONVERSION_API,
  BILL_API,
  CALCULATOR_PAGE_NAME,
  CALCULATOR_SUB_TOTAL_LABAL,
  CALCULATOR_DISCOUNT_LABAL,
  CALCULATOR_TOTAL_LABAL,
  CALCULATOR_ADDITIONAL_DISCOUNT_LABAL,
} from "@/app/constants/constants";
import ItemInterface from "@/app/interfaces/item_interface";
import SearchInput from "@/app/components/Forms/calculator/search_input";
import { Table, InputGroup, Form } from "react-bootstrap";
import NumberInput from "@/app/components/Forms/number_input";
import createBillPDF from "./helpers";

/** Helper: fetch conversion multiplier between two units.
 * Convention in your API: 1 of first_unit == multiplier of second_unit.
 * If direct not found, try reverse and invert the multiplier.
 */
async function getMultiplier(fromUnitId: string, toUnitId: string): Promise<number | null> {
  if (fromUnitId === toUnitId) return 1;

  // Try direct
  const directRes = await fetch(
    `${UNIT_CONVERSION_API}fetch_all_unit_conversions?first_unit_id=${fromUnitId}&second_unit_id=${toUnitId}`
  );
  const directJson = await directRes.json();
  if (directJson?.success && Array.isArray(directJson.data) && directJson.data.length > 0) {
    const m = Number(directJson.data[0].multiplier);
    return Number.isFinite(m) ? m : null;
  }

  // Try reverse
  const revRes = await fetch(
    `${UNIT_CONVERSION_API}fetch_all_unit_conversions?first_unit_id=${toUnitId}&second_unit_id=${fromUnitId}`
  );
  const revJson = await revRes.json();
  if (revJson?.success && Array.isArray(revJson.data) && revJson.data.length > 0) {
    const m = Number(revJson.data[0].multiplier);
    if (Number.isFinite(m) && m !== 0) return 1 / m;
  }

  return null;
}

/** Convert qty from `fromUnit` to the item's main unit. */
async function toMainUnitQty(qty: number, fromUnitId: string, mainUnitId: string): Promise<number> {
  const mul = await getMultiplier(fromUnitId, mainUnitId);
  if (mul === null) throw new Error(`No unit conversion found (${fromUnitId} ↔ ${mainUnitId})`);
  return qty * mul;
}

/** Convert qty from item's main unit to `toUnit`. */
async function fromMainToSelected(qtyMain: number, toUnitId: string, mainUnitId: string): Promise<number> {
  const mul = await getMultiplier(mainUnitId, toUnitId);
  if (mul === null) throw new Error(`No unit conversion found (${mainUnitId} ↔ ${toUnitId})`);
  return qtyMain * mul;
}

/** Compute available quantity for a row in the currently selected unit. */
async function computeAvailableInSelectedUnit(row: CalculatorRow): Promise<number> {
  const total = Number(row.stock?.total_quantity || 0);
  const sold = Number(row.stock?.sold_quantity || 0);
  const damaged = Number(row.stock?.damaged_quantity || 0);
  const availableMain = Math.max(0, total - sold - damaged);

  const selectedUnit = row.selectedUnitId || row.item.main_unit_id;
  const mainUnit = row.item.main_unit_id;

  if (selectedUnit === mainUnit) return availableMain;

  const converted = await fromMainToSelected(availableMain, selectedUnit, mainUnit);
  // We only allow integer amounts in the UI (based on your NumberInput usage), floor it.
  return Math.floor(converted);
}

function CalculatorPage() {
  const [rows, setRows] = useState<CalculatorRow[]>([]);
  const [grandSubtotal, setGrandSubtotal] = useState(0);
  const [grandDiscount, setGrandDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const subtotal = rows.reduce((acc, row) => acc + row.subtotal, 0);
    const discount = rows.reduce((acc, row) => acc + row.rowDiscount, 0);
    const total = subtotal - discount;

    setGrandSubtotal(subtotal);
    setGrandDiscount(discount);
    setGrandTotal(total);
  }, [rows]);

  // Display total that updates as user types additional discount
  const netTotal = Math.max(0, grandTotal - (Number.isFinite(additionalDiscount) ? additionalDiscount : 0));

  const handleItemSelect = async (item: ItemInterface) => {
    try {
      const response = await fetch(`${STOCKS_API}fetch_all_stocks?item_id=${item._id}`);
      const jsonResponse = await response.json();

      if (jsonResponse.success && Array.isArray(jsonResponse.data) && jsonResponse.data.length > 0) {
        const allStocks = jsonResponse.data;
        const defaultStock = allStocks[0];
        const today = new Date();

        const applicableDiscounts = defaultStock.discount.filter((discount: any) => {
          const startDate = new Date(discount.start_date);
          const endDate = new Date(discount.end_date);
          return today >= startDate && today <= endDate;
        });

        const totalUnitDiscount = applicableDiscounts.reduce((acc: number, discount: any) => acc + discount.percentage, 0);
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
          selectedUnitId: item.main_unit_id, // use the interface's field name
          conversionMultiplier: 1,           // main unit -> main unit
        };

        setRows(prev => [...prev, newRow]);
      }
    } catch (error) {
      console.error("Error fetching stock for item:", error);
    }
  };

  /** When unit changes: update selectedUnitId, clamp amount to the new unit's availability, and recalc totals. */
  const handleUnitChange = async (row: CalculatorRow, index: number, selectedUnitId: string) => {
    try {
      const updatedRow: CalculatorRow = { ...row, selectedUnitId };

      // keep an up-to-date multiplier (main -> selected) for anyone else consuming it
      const mul = await getMultiplier(row.item.main_unit_id, selectedUnitId);
      updatedRow.conversionMultiplier = mul ?? 1;

      const maxAllowed = await computeAvailableInSelectedUnit(updatedRow);
      const clampedAmount = Math.max(1, Math.min(updatedRow.amount || 1, maxAllowed));

      const subtotal = (row.baseSellingPrice || 0) * clampedAmount;
      const rowDiscount = (row.unitDiscount || 0) * clampedAmount;

      updatedRow.amount = clampedAmount;
      updatedRow.subtotal = subtotal;
      updatedRow.rowDiscount = rowDiscount;

      setRows(prev => {
        const copy = [...prev];
        copy[index] = updatedRow;
        return copy;
      });
    } catch (e: any) {
      alert(e?.message || "Cannot convert between the selected unit and the main unit.");
    }
  };

  /** Clamp on typing: don’t let user exceed available qty in the selected unit. */
  const handleAmountChange = async (row: CalculatorRow, index: number, nextValue: number) => {
    const n = Number(nextValue);
    if (!Number.isFinite(n) || n <= 0) return;

    try {
      const maxAllowed = await computeAvailableInSelectedUnit(row);
      const clamped = Math.max(1, Math.min(n, maxAllowed));

      const subtotal = (row.stock?.selling_price || 0) * clamped;
      const rowDiscount = (row.unitDiscount || 0) * clamped;

      const updatedRow: CalculatorRow = {
        ...row,
        amount: clamped,
        subtotal,
        rowDiscount,
      };

      setRows(prev => {
        const newRows = [...prev];
        newRows[index] = updatedRow;
        return newRows;
      });

      if (n > maxAllowed) {
        console.warn(`Requested ${n}, but only ${maxAllowed} available in this unit.`);
      }
    } catch (e: any) {
      alert(e?.message || "Cannot determine available quantity for this unit.");
    }
  };

  /** Preflight validation before saving:
   *  - Convert each row.amount to MAIN UNIT
   *  - Aggregate by stock._id
   *  - Ensure sum <= availableMain for that stock
   */
  const validateAllRowsAgainstStock = async () => {
    type Totals = Record<string, { needMain: number; availableMain: number; name: string }>;
    const totals: Totals = {};

    for (const row of rows) {
      const stockId = String(row.stock?._id);
      if (!stockId) throw new Error("Row has no stock selected.");

      const mainUnit = row.item.main_unit_id;
      const unitId = row.selectedUnitId || mainUnit;
      const needMain = await toMainUnitQty(row.amount || 0, unitId, mainUnit);

      const total = Number(row.stock?.total_quantity || 0);
      const sold = Number(row.stock?.sold_quantity || 0);
      const damaged = Number(row.stock?.damaged_quantity || 0);
      const availableMain = Math.max(0, total - sold - damaged);

      if (!totals[stockId]) {
        totals[stockId] = { needMain: 0, availableMain, name: row.stock?.name || stockId };
      }
      totals[stockId].needMain += needMain;
    }

    const problems = Object.entries(totals)
      .filter(([_, t]) => t.needMain - t.availableMain > 1e-9)
      .map(([stockId, t]) => `• ${t.name} (stock ${stockId}): need ${t.needMain.toFixed(2)}, available ${t.availableMain.toFixed(2)}`);

    if (problems.length > 0) {
      throw new Error(
        "Not enough stock to fulfill the bill:\n" + problems.join("\n")
      );
    }
  };

  const saveBill = async () => {
    if (rows.length === 0) {
      alert("Add at least one item before saving the bill.");
      return;
    }

    try {
      await validateAllRowsAgainstStock();
    } catch (e: any) {
      alert(e?.message || "Insufficient stock for one or more lines.");
      return;
    }

    setIsSaving(true);

    const billPayload = {
      date: new Date(),
      additional_discount: additionalDiscount,
      bill_item: rows.map((row) => ({
        stock_id: row.stock?._id,
        quantity: row.amount,
        unit_id: row.selectedUnitId || row.item.main_unit_id,
        discount: row.unitDiscount ?? 0,
      })),
    };

    try {
      const response = await fetch(`${BILL_API}create_bill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billPayload),
      });

      const result = await response.json();

      if (result?.success) {
        createBillPDF(rows, grandSubtotal, grandDiscount, grandTotal, additionalDiscount);
        alert("Bill saved successfully!");
        setRows([]);
        setAdditionalDiscount(0);
      } else {
        alert(`Failed to save bill: ${result?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error saving bill:", err);
      alert("An error occurred while saving the bill.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h3 className='text-primary'>{CALCULATOR_PAGE_NAME}</h3>
      <SearchInput
        label={SEARCH}
        form_id="search"
        placeholder_text={ITEMS_SEARCH_PLACEHOLDER}
        onSelectItem={handleItemSelect}
      />

      <div className="scrollable-calculator-table">
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
                      const selectedStock = row.allStocks.find((s: any) => s._id === e.target.value);
                      if (!selectedStock) return;

                      const today = new Date();
                      const applicableDiscounts = selectedStock.discount.filter((discount: any) => {
                        const start = new Date(discount.start_date);
                        const end = new Date(discount.end_date);
                        return today >= start && today <= end;
                      });

                      const unitDiscount = applicableDiscounts.reduce((acc: number, d: any) => acc + d.percentage, 0);
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
                    {row.allStocks.map((stock: any, i: number) => (
                      <option key={i} value={stock._id}>{stock.name}</option>
                    ))}
                  </select>
                </td>
                <td>{row.stock?.selling_price || 0}</td>
                <td>{row.unitDiscount}</td>
                <td>
                  <select
                    className="form-select"
                    value={row.selectedUnitId || row.item.main_unit_id}
                    onChange={(e) => handleUnitChange(row, index, e.target.value)}
                  >
                    {/* main unit first */}
                    <option value={row.item.main_unit_id}>Main Unit</option>
                    {/* other units if present on the item */}
                    {(row.item.other_unit_ids || []).map((u: string) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <NumberInput
                    value={row.amount}
                    min_value={1}
                    onChangeText={(e: any) => handleAmountChange(row, index, Number(e.target.value))} form_id={""} placeholder_text={""}                  />
                </td>
                <td>{row.subtotal}</td>
                <td>{row.rowDiscount}</td>
                <td>{row.subtotal - row.rowDiscount}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setRows(prev =>
                        prev.filter((rowToKeep, i) => {
                          void rowToKeep; // satisfy lint
                          return i !== index;
                        })
                      );
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end align-items-center mt-4">
        <div className="border rounded p-3 bg-light" style={{ minWidth: 400 }}>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-primary"><strong>{CALCULATOR_SUB_TOTAL_LABAL}</strong></span>
            <span>Rs. {grandSubtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-primary"><strong>{CALCULATOR_DISCOUNT_LABAL}</strong></span>
            <span>Rs. {grandDiscount.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <label htmlFor="additional-discount" className="form-label mb-0 me-2 text-primary" style={{ minWidth: 160 }}>
              <strong>{CALCULATOR_ADDITIONAL_DISCOUNT_LABAL}</strong>
            </label>

            <InputGroup style={{ width: 200 }}>
              <InputGroup.Text>Rs.</InputGroup.Text>
              <Form.Control
                type="number"
                id="additional-discount"
                className="text-end"
                value={additionalDiscount}
                min={0}
                step="0.01"
                onChange={(e) => {
                  const v = e.target.value;
                  const n = v === "" ? 0 : Number(v);
                  setAdditionalDiscount(Number.isFinite(n) ? n : 0);
                }}
              />
            </InputGroup>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-primary"><strong>{CALCULATOR_TOTAL_LABAL}</strong></span>
            <span>Rs. {netTotal.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success"
              onClick={saveBill}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Bill"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalculatorPage;
