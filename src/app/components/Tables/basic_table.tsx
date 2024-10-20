'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateButton from '@/app/components/Buttons/update_button';
import DeleteButton from '@/app/components/Buttons/delete_button';

interface BasicTableProps {
  table_fields: string[];
  table_records: string[][];
  table_id: string;
  startingIndex: number; // New prop for starting index
  onUpdate: (rowIndex: number) => void; // New prop for handling update
  onDelete: (rowIndex: number) => void; // New prop for handling delete
}

const BasicTable: React.FC<BasicTableProps> = ({
  table_fields,
  table_records,
  table_id,
  startingIndex,
  onUpdate,
  onDelete,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key; // Get the pressed key
      let rowIndex: number | null = null;

      console.log(`Key pressed: ${key}`); // Debugging output

      // Check for number keys 1-9 and 0
      if (key >= '1' && key <= '9') {
        rowIndex = parseInt(key) - 1; // Convert to zero-based index
      } else if (key === '0') {
        rowIndex = 9; // Zero-based index for the 10th row
      }else{
        console.log("error")
      }

      // If a valid rowIndex is found
      if (rowIndex !== null && rowIndex < table_records.length) {
        setSelectedRow(rowIndex);

        if (event.shiftKey) {
          console.log(`Updating row: ${rowIndex}`); // Debugging output
          onUpdate(rowIndex);
        } else if (event.key === "Delete") {
          console.log(`Deleting row: ${rowIndex}`); // Debugging output
          onDelete(rowIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
    };
  }, [table_records.length, onUpdate, onDelete]);

  return (
    <Table responsive bordered striped hover id={table_id} size="sm">
      <thead>
        <tr className='text-center'>
          <th className='bg-primary text-white'>#</th>
          {table_fields.map((field, index) => (
            <th key={index} className="bg-primary text-white">
              {field}
            </th>
          ))}
          <th className='bg-primary text-white'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {table_records && table_records.length > 0 ? (
          table_records.map((record, rowIndex) => (
            <tr key={rowIndex} className={`text-center ${selectedRow === rowIndex ? 'table-warning' : ''}`}>
              <td>{startingIndex + rowIndex + 1}</td>
              {Array.isArray(record) && record.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              <td>
                <UpdateButton
                  label="Update"
                  onClickButton={() => onUpdate(rowIndex)}
                  btn_id={`update_button_${startingIndex + rowIndex}`}
                  rowIndex={rowIndex}
                />
                <DeleteButton
                  label="Delete"
                  onClickButton={() => onDelete(rowIndex)}
                  btn_id={`delete_button_${startingIndex + rowIndex}`}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={table_fields.length + 1} className="text-center">
              No records available.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BasicTable;
