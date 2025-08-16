'use client';

import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NumberInputProps {
  label?: string; // Make label optional
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message?: string; // Make form_message optional
  placeholder_text: string;
  min_value?: number; // Make min_value optional
  max_value?: number; // Make max_value optional
  value: number;
  onLoad?: () => void; // Optional onLoad function
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
  onLoad,
}) => {
  // Trigger onLoad when the component mounts
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, []); // Empty dependency array ensures it runs only once when mounted

  return (
    <>
      {label && <Form.Label htmlFor={form_id} className={'text-primary'}>{label}</Form.Label>} {/* Conditionally render label */}
      <Form.Control
        type="number"
        id={form_id}
        aria-describedby={form_message ? "passwordHelpBlock" : undefined}
        onChange={onChangeText}
        placeholder={placeholder_text}
        size="sm"
        value={value}
        {...(min_value !== undefined ? { min: min_value } : {})} // Conditionally apply min
        {...(max_value !== undefined ? { max: max_value } : {})} // Conditionally apply max
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