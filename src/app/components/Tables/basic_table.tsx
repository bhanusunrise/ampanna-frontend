'use client';

import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface BasicTableProps {
  table_fields: string[];
  table_records: string[][];
}

const Basictable: React.FC<BasicTableProps> = ({ table_fields, table_records }) => {
  return (
    <Table responsive bordered>
      <thead>
        <tr>
          <th>#</th>

          {table_fields.map((field, index) => (
            <th key={index}>{field}</th>
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

export default Basictable;
