'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SelectBoxProps {
  values: string[];
  display_values: string[];
  label_name: string;
  form_id: string;
  onChange: (value: string) => void; // Add onChange prop to handle selection changes
}

const SelectBox: React.FC<SelectBoxProps> = ({
  values,
  display_values,
  label_name,
  form_id,
  onChange,
}) => {
  return (
    <>
      <Form.Label htmlFor={form_id}>{label_name}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        style={{ maxWidth: '300px' }}
        onChange={(e) => onChange(e.target.value)} // Call onChange with the selected value
      >
        <option value="">Select an option</option> {/* Optional: Default option */}
        {values.map((value, index) => (
          <option key={index} value={value}>
            {display_values[index]}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default SelectBox;
