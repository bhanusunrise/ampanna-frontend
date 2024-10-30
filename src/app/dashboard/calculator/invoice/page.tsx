'use client'

import React, { useRef } from 'react';
import Invoice from '../../../components/Documents/invoice';
import html2pdf from 'html2pdf.js';

const PrintInvoice: React.FC = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (invoiceRef.current) {
      const baseHeight = 4; // Initial height for A7 format in inches
      const baseItems = 2; // Base item count threshold
      const additionalHeightPerSet = 1.5; // Additional height per set of 3 items
      const items = invoiceData.items.length;
      
      // Calculate height adjustment
      const extraItems = Math.max(0, items - baseItems);
      const heightAdjustment = Math.ceil(extraItems / 3) * additionalHeightPerSet;
      const pdfHeight = baseHeight + heightAdjustment;

      // Configure the PDF options
      const options = {
        margin: 0.1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 2 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: [2.91, pdfHeight], orientation: 'portrait' }, // A7 width, dynamic height
      };

      // Generate the PDF and save
      html2pdf().set(options).from(invoiceRef.current).save();
    }
  };

  const invoiceData = {
    hardware_name: "ABC Hardware",
    hardware_address: "32/B, Weliweriya Road, Radawana.",
    hardware_phone: "1234567890",
    invoiceNumber: '12345',
    date: '2024-10-29',
    time: '10:20 AM',
    user: 'Pasindu',
    items: [
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },
      { name: 'Product A', unit: "#", quantity: 2, price: 50, discount: 10 },
      { name: 'Product B', unit: "#", quantity: 1, price: 100, discount: 10 },

      
      // Add more items as needed
    ],
    payment: "2000",
  };

  return (
    <div>
      <Invoice ref={invoiceRef} {...invoiceData} />
      <button onClick={handlePrint}>Download and Print Invoice</button>
    </div>
  );
};

export default PrintInvoice;
