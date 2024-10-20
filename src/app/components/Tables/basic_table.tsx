'use client';

import React from 'react';
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

const BasicTable: React.FC<BasicTableProps> = ({ table_fields, table_records, table_id, startingIndex, onUpdate, onDelete }) => {
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
          <th className='bg-primary text-white'>Actions</th> {/* Add a header for actions */}
        </tr>
      </thead>
      <tbody>
        {table_records && table_records.length > 0 ? (
          table_records.map((record, rowIndex) => (
            <tr key={rowIndex} className='text-center'>
              <td>{startingIndex + rowIndex + 1}</td>
              {Array.isArray(record) && record.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              <td>
                <UpdateButton 
                  label="Update" 
                  onClickButton={() => onUpdate(rowIndex)} 
                  btn_id={`update_button_${startingIndex + rowIndex}`} 
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
