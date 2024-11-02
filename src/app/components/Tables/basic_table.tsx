'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateButton from '@/app/components/Buttons/update_button';
import DeleteButton from '@/app/components/Buttons/delete_button';
import RestoreButton from '@/app/components/Buttons/restore_button';
import { ACTONS_FIELD, DELETE_BUTTON_LABAL, RESTORE_BUTTON_LABAL, UPDATE_BUTTON_LABAL } from '@/app/constants/constants';

interface BasicTableProps {
  table_fields: string[];
  table_records: string[][];
  table_id: string;
  startingIndex: number;
  onUpdate: (rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
  onRestore: (rowIndex: number) => void;
}

const BasicTable: React.FC<BasicTableProps> = ({
  table_fields,
  table_records,
  table_id,
  startingIndex,
  onUpdate,
  onDelete,
  onRestore,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [tableSize, setTableSize] = useState<'sm' | 'md'>('sm');

  useEffect(() => {
    const updateTableSize = () => {
      if (window.innerWidth > 1366) {
        setTableSize('md');
      } else {
        setTableSize('sm');
      }
    };

    updateTableSize();
    window.addEventListener('resize', updateTableSize);

    return () => {
      window.removeEventListener('resize', updateTableSize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      let rowIndex: number | null = null;

      if (key >= '1' && key <= '9') {
        rowIndex = parseInt(key) - 1;
      } else if (key === '0') {
        rowIndex = 9;
      }

      if (rowIndex !== null && rowIndex < table_records.length) {
        setSelectedRow(rowIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [table_records.length]);

  const isInactive = (record: string[]) => {
    const statusIndex = table_fields.indexOf('තත්වය') + 1;
    console.log("Status column index:", statusIndex);
    console.log("Status field value in row:", record[statusIndex]);
    return statusIndex !== -1 && record[statusIndex] === 'අක්‍රීය';
  };

  return (
    <Table responsive bordered striped hover id={table_id} size={tableSize} style={{ fontSize: 15 }}>
      <thead>
        <tr>
          <th className="bg-primary text-white">#</th>
          {table_fields.map((field, index) => (
            <th key={index} className="bg-primary text-white">
              {field}
            </th>
          ))}
          <th className="bg-primary text-white">{ACTONS_FIELD}</th>
        </tr>
      </thead>
      <tbody>
        {table_records && table_records.length > 0 ? (
          table_records.map((record, rowIndex) => {
            const displayedRecord = record.slice(1);
            const rowClasses = `${selectedRow === rowIndex ? 'table-warning' : ''} ${
              isInactive(record) ? 'bg-danger text-white' : ''
            }`;

            return (
              <tr key={rowIndex} className={rowClasses}>
                <td>{startingIndex + rowIndex + 1}</td>
                {Array.isArray(displayedRecord) &&
                  displayedRecord.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ maxWidth: 10 }}>{cell}</td>
                  ))}
                <td>
                  {isInactive(record) ? (
                    <RestoreButton
                      label={RESTORE_BUTTON_LABAL}
                      onClickButton={() => onRestore(startingIndex + rowIndex)}
                      btn_id={`restore_button_${startingIndex + rowIndex}`}
                      rowIndex={startingIndex + rowIndex}
                    />
                  ) : (
                    <>
                      <UpdateButton
                        label={UPDATE_BUTTON_LABAL}
                        onClickButton={() => onUpdate(startingIndex + rowIndex)}
                        btn_id={`update_button_${startingIndex + rowIndex}`}
                        rowIndex={startingIndex + rowIndex}
                      />
                      <DeleteButton
                        label={DELETE_BUTTON_LABAL}
                        onClickButton={() => onDelete(startingIndex + rowIndex)}
                        btn_id={`delete_button_${startingIndex + rowIndex}`}
                        rowIndex={startingIndex + rowIndex}
                      />
                    </>
                  )}
                </td>
              </tr>
            );
          })
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
