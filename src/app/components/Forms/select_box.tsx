'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SELECT_BOX_PLACEHOLDER } from '@/app/constants/constants';

interface SelectBoxProps {
  values: string[];
  display_values: string[];
  label_name: string;
  form_id: string;
  onChange: (value: string) => void;
  selected_value?: string;
  disabled?: boolean; // New optional prop for disabling the select box
}

const SelectBox: React.FC<SelectBoxProps> = ({
  values,
  display_values,
  label_name,
  form_id,
  onChange,
  selected_value,
  disabled = false, // Default to false if not provided
}) => {
  return (
    <>
      <Form.Label htmlFor={form_id}>{label_name}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        style={{ maxWidth: '300px' }}
        onChange={(e) => onChange(e.target.value)}
        value={selected_value || ""} // Keep selected value updated
        size="sm"
        disabled={disabled} // Control disabled status
      >
        <option value="" disabled>
          {SELECT_BOX_PLACEHOLDER}
        </option>
        {values.map((value, index) => (
          <option key={value} value={value}>
            {display_values[index]}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default SelectBox;
