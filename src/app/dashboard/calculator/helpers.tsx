import { CalculatorRow } from "@/app/interfaces/tables/calculator_row_interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function createBillPDF(rows: CalculatorRow[], grandSubTotal: number, grandDiscount: number, grandTotal: number) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Invoice / Bill", 14, 20);

  // Date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

  // Table headers
  const tableColumn = ["#", "Item", "Unit", "Qty", "Price", "Discount", "Total"];
  const tableRows: any[] = [];

  rows.forEach((row, index) => {
    const itemData = [
      index + 1,
      row.item.name,
      row.unitId === row.item.main_unit_id
        ? row.item.main_unit_name
        : row.item.other_unit_names?.[row.item.other_unit_ids.indexOf(row.unitId)] || row.unitId,
      row.amount,
      row.stock?.selling_price?.toFixed(2) || 0,
      `${row.unitDiscount}%`,
      (row.subtotal - row.rowDiscount).toFixed(2),
    ];
    tableRows.push(itemData);
  });

  // Add table to PDF
  autoTable(doc, {
    startY: 40,
    head: [tableColumn],
    body: tableRows,
  });

  // Add totals
  const finalY = (doc as any).lastAutoTable.finalY || 50;
  doc.text(`Sub Total: Rs. ${grandSubTotal.toFixed(2)}`, 14, finalY + 10);
  doc.text(`Discount: Rs. ${grandDiscount.toFixed(2)}`, 14, finalY + 16);
  doc.text(`Grand Total: Rs. ${grandTotal.toFixed(2)}`, 14, finalY + 22);

  // Save PDF
  doc.save("invoice.pdf");
}
