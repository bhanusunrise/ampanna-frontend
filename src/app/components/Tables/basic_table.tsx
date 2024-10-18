'use client';

import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface BasicTableProps {
  table_fields: string[];
  table_records: string[][];
  table_id: string;
  startingIndex: number; // New prop for starting index
}

const BasicTable: React.FC<BasicTableProps> = ({ table_fields, table_records, table_id, startingIndex }) => {
  return (
    <Table responsive bordered striped hover id={table_id} size="sm">
      <thead>
        <tr>
          <th className='bg-primary text-white'>#</th>
          {table_fields.map((field, index) => (
            <th key={index} className="bg-primary text-white">
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table_records && table_records.length > 0 ? (
          table_records.map((record, rowIndex) => (
            <tr key={rowIndex}>
              <td>{startingIndex + rowIndex + 1}</td> {/* Calculate the correct index */}
              {Array.isArray(record) && record.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
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
