'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NumberInputProps {
  label?: string; // Make label optional
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message?: string; // Make form_message optional
  placeholder_text: string;
  min_value: number;
  max_value: number;
  value: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  onChangeText,
  form_id,
  form_message,
  placeholder_text,
  min_value,
  max_value,
  value,
}) => {
  return (
    <>
      {label && <Form.Label htmlFor={form_id}>{label}</Form.Label>} {/* Conditionally render label */}
      <Form.Control
        type="number"
        id={form_id}
        aria-describedby={form_message ? "passwordHelpBlock" : undefined}
        onChange={onChangeText}
        placeholder={placeholder_text}
        min={min_value}
        max={max_value}
        size="sm"
        value={value}
      />
      {form_message && (
        <Form.Text id="passwordHelpBlock" muted>
          {form_message}
        </Form.Text>
      )} {/* Conditionally render form_message */}
    </>
  );
};

export default NumberInput;