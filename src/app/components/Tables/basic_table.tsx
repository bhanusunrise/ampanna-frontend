'use client';

import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface BasicTableProps {
  table_fields: string[];
  table_records: string[][];
  table_id: string;
}

const BasicTable: React.FC<BasicTableProps> = ({ table_fields, table_records, table_id }) => {
  return (
    <Table responsive bordered striped hover id={table_id}>
      <thead>
        <tr>
          {/* Apply bg-primary and text-white to style the header */}
          <th className='bg-primary text-white'>#</th>
          {table_fields.map((field, index) => (
            <th key={index} className="bg-primary text-white">
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table_records.map((record, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            {record.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BasicTable;
