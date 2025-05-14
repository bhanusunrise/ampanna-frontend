'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmailInput from '../email_input'; // Assuming EmailInput is in the same directory



interface ExtraEmailsProps {
  emails: string[];
  onEmailChange: (index: number, newEmail: string) => void;
  onAddEmail: () => void;
  onRemoveEmail: (index: number) => void;
}

const ExtraEmails: React.FC<ExtraEmailsProps> = ({ emails, onEmailChange, onAddEmail, onRemoveEmail }) => {
  return (
    <div>
      <Table bordered>
        <tbody>
          {emails.map((email, index) => (
            <tr key={index}>
              <td>
                <EmailInput
                  form_id={`email-${index}`}

                  placeholder_text="example@mail.com"
                  value={email}
                  onChangeText={(e) => onEmailChange(index, e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => onRemoveEmail(index)} className="btn-sm">
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddEmail} variant="primary" className="mt-2">
        +
      </Button>
    </div>
  );
};

export default ExtraEmails;