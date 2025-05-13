'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import TextInput from '../text_input'; // Assuming TextInput is in the same directory

interface Address {
  value: string;
}

interface ExtraAddressesProps {
  addresses: Address[];
  onAddressChange: (index: number, newValue: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
}

const ExtraAddresses: React.FC<ExtraAddressesProps> = ({ addresses, onAddressChange, onAddRow, onRemoveRow }) => {
  return (
    <div>
      <Table bordered>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>
                <TextInput
                  form_id={`address-${index}`}
                  placeholder_text="ලිපිනයක් ඇතුළත් කරන්න"
                  value={address.value}
                  onChangeText={(e) => onAddressChange(index, e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => onRemoveRow(index)} className="btn-sm">
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddRow} variant="primary" className="mt-2">
        +
      </Button>
    </div>
  );
};

export default ExtraAddresses;