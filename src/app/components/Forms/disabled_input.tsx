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
        style={{ maxWidth: '300px' }}
        value={value}
        size="sm"
        disabled={disabled} // Apply disabled prop
      />
      <Form.Text id="passwordHelpBlock" muted>
        {form_message}
      </Form.Text>
    </>
  );
};

export default DisabledInput;
