'use client';

import React from 'react';
import { Form } from 'react-bootstrap';

interface TextInputProps {
  label?: string; // Made optional
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message?: string; // Made optional
  placeholder_text: string;
  value: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Added optional onKeyDown prop
}

const TextInput: React.FC<TextInputProps> = ({ label, onChangeText, form_id, form_message, placeholder_text, value }) => {
  return (
    <>
      {label && <Form.Label htmlFor={form_id} className="text-primary">{label}</Form.Label>}
      <Form.Control
        type="text"
        id={form_id}
        aria-describedby={form_message ? "inputHelpBlock" : undefined}
        onChange={onChangeText}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission on Enter key
          }
        }}
        placeholder={placeholder_text}
        value={value}
        size="sm"
      />
      {form_message && (
        <Form.Text id="inputHelpBlock" muted>
          {form_message}
        </Form.Text>
      )}
    </>
  );
};

export default TextInput;
