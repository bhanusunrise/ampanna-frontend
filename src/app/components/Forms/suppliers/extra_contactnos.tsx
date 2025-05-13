'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberInput from '../number_input'; // Assuming NumberInput is in the same directory

interface ContactNo {
  number: number;
}

interface ExtraContactNosProps {
  contactNos: ContactNo[];
  onContactChange: (index: number, newNumber: number) => void;
  onAddContact: () => void;
  onRemoveContact: (index: number) => void;
}

const ExtraContactNos: React.FC<ExtraContactNosProps> = ({ contactNos, onContactChange, onAddContact, onRemoveContact }) => {
  return (
    <div>
      <Table bordered>
        <tbody>
          {contactNos.map((contact, index) => (
            <tr key={index}>
              <td>
                <NumberInput
                  form_id={`contact-no-${index}`}
                  placeholder_text="762018348"
                  value={contact.number}
                  min_value={100000000} // Example minimum length for a valid number
                  max_value={999999999} // Example maximum length for a valid number
                  onChangeText={(e) => onContactChange(index, Number(e.target.value))}

                />
              </td>
              <td>
                <Button variant="danger" onClick={() => onRemoveContact(index)} className="btn-sm">
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddContact} variant="primary" className="mt-2">
        +
      </Button>
    </div>
  );
};

export default ExtraContactNos;