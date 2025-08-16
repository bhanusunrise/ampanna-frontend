import { CalculatorRow } from "@/app/interfaces/tables/calculator_row_interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import "@/app/fonts/ns_sinhala";

/**
 * Prints a bill PDF.
 * @param rows            Table rows
 * @param grandSubTotal   Sum of row subtotals (before any discount)
 * @param grandDiscount   Sum of all unit-level / per-row discounts
 * @param grandTotal      grandSubTotal - grandDiscount
 * @param additionalDiscount  extra discount applied to the whole bill
 */
export default function createBillPDF(
  rows: CalculatorRow[],
  grandSubTotal: number,
  grandDiscount: number,
  grandTotal: number,
  additionalDiscount: number
) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Invoice / Bill", 14, 20);

  // Date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

  // Table
  const tableColumn = ["#", "Item", "Qty", "Price", "Discount", "Total"];
  const tableRows: (string | number)[][] = [];

  rows.forEach((row, index) => {
    tableRows.push([
      index + 1,
      row.item.name,
      row.amount,
      (row.stock?.selling_price ?? 0).toFixed(2),
      String(row.unitDiscount),
      (row.subtotal - row.rowDiscount).toFixed(2),
    ]);
  });

  autoTable(doc, {
    startY: 40,
    head: [tableColumn],
    body: tableRows,
  });

  // Totals
  const finalY = (doc as any).lastAutoTable?.finalY ?? 50;
  const addl = Number.isFinite(additionalDiscount) ? additionalDiscount : 0;
  const netTotal = Math.max(0, grandTotal - addl);

  doc.text(`Sub Total: Rs. ${grandSubTotal.toFixed(2)}`, 14, finalY + 10);
  doc.text(`Discount: Rs. ${grandDiscount.toFixed(2)}`, 14, finalY + 16);
  doc.text(`Additional Discount: Rs. ${addl.toFixed(2)}`, 14, finalY + 22);
  doc.text(`Net Total: Rs. ${netTotal.toFixed(2)}`, 14, finalY + 28);

  doc.save("invoice.pdf");
}
