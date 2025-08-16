'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface EmailInputProps {
  label?: string; // Make label optional
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message: string;
  placeholder_text: string;
  value: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  label,
  onChangeText,
  form_id,
  placeholder_text,
  value,
}) => {
  return (
    <>
      {label && <Form.Label htmlFor={form_id}>{label}</Form.Label>} {/* Conditionally render label */}
      <Form.Control
        type="email"
        id={form_id}
        aria-describedby="passwordHelpBlock"
        onChange={onChangeText}
        placeholder={placeholder_text}
        size="sm"
        value={value}
      />

    </>
  );
};

export default EmailInput;
