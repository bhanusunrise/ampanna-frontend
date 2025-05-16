'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CheckboxProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message: string;
  checked: boolean; // Add checked state
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onChange,
  form_id,
  form_message,
  checked, // Destructure checked prop
  className, // Add className to destructure
}) => {
  return (
    <>
      <Form.Check 
        type="checkbox"
        id={form_id}
        label={label}
        onChange={onChange}
        checked={checked} // Set checked value
        className={className}
      />
      <Form.Text id={`${form_id}-help`} muted>
        {form_message}
      </Form.Text>
    </>
  );
};

export default Checkbox;