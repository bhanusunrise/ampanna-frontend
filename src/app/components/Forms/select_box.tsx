'use client';

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SelectBoxProps {
  values: string[]; 
  display_values: string[]; 
  label_name: string;
  form_id: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ values, display_values, label_name, form_id }) => {
  return (
    <><Form.Label htmlFor={form_id}>{label_name}</Form.Label><Form.Select aria-label="Default select example">
          {values.map((value, index) => (
              <option key={index} value={value}>
                  {display_values[index]}
              </option>
          ))}
      </Form.Select></>
  );
};

export default SelectBox;
