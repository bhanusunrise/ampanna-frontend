'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NumberInputProps {
  label: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message: string;
  placeholder_text: string;
  min_value: number;
  max_value: number;
  value: number; // Add value prop
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  onChangeText,
  form_id,
  form_message,
  placeholder_text,
  min_value,
  max_value,
  value, // Destructure value prop
}) => {
  return (
    <>
      <Form.Label htmlFor={form_id}>{label}</Form.Label>
      <Form.Control
        type="number"
        id={form_id}
        aria-describedby="passwordHelpBlock"
        onChange={onChangeText}
        placeholder={placeholder_text}
        min={min_value}
        max={max_value}
        style={{ maxWidth: '300px' }}
        size='sm'
        value={value} // Set the value prop here
      />
      <Form.Text id="passwordHelpBlock" muted>
        {form_message}
      </Form.Text>
    </>
  );
};

export default NumberInput;
