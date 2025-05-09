import React from 'react';
import { Form } from 'react-bootstrap';

interface DisabledInputProps {
  label: string;
  form_id: string;
  form_message: string;
  value: string;
  disabled?: boolean; // Optional disabled prop
}

const DisabledInput: React.FC<DisabledInputProps> = ({ label, form_id, form_message, value, disabled = false }) => {
  return (
    <>
      <Form.Label htmlFor={form_id}>{label}</Form.Label>
      <Form.Control
        type="text"
        id={form_id}
        aria-describedby="passwordHelpBlock"
        value={value}
        size="sm"
        disabled={disabled} // Apply disabled prop
        readOnly // Make the input read-only
      />
      <Form.Text id="passwordHelpBlock" muted>
        {form_message}
      </Form.Text>
    </>
  );
};

export default DisabledInput;
