'use client';

import React, { useEffect, useState } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SELECT_BOX_PLACEHOLDER } from '@/app/constants/constants';

interface SelectCheckBoxProps {
  values: string[];
  display_values: string[];
  label_name: string;
  form_id: string;
  onChange: (selectedValues: string[]) => void;
  selected_values?: string[];
}

const SelectCheckBox: React.FC<SelectCheckBoxProps> = ({
  values,
  display_values,
  label_name,
  form_id,
  onChange,
  selected_values = [], // Initialize selected values as an empty array if not provided
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(selected_values);

  // Update selectedValues when selected_values prop changes
  useEffect(() => {
    if (selected_values == null || selected_values.length === 0) {
      setSelectedValues([]); // Uncheck all checkboxes if selected_values is null or empty
    } else {
      setSelectedValues(selected_values); // Set selectedValues based on prop
    }
  }, [selected_values]);

  const handleCheckboxChange = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value) // Remove if already selected
      : [...selectedValues, value]; // Add if not selected

    setSelectedValues(updatedSelectedValues);
    onChange(updatedSelectedValues); // Pass the updated array to the parent
  };

  return (
    <>
      <Form.Label htmlFor={form_id}>{label_name}</Form.Label>
      <DropdownButton
        id={form_id}
        title={selectedValues.length > 0 ? `${selectedValues.length} selected` : SELECT_BOX_PLACEHOLDER}
        variant="outline-secondary"
        style={{ maxWidth: '300px' }}
        size="sm"
      >
        <Dropdown.ItemText>Select options:</Dropdown.ItemText>
        {values.map((value, index) => (
          <Dropdown.Item
            as="button"
            key={value}
            className="d-flex align-items-center"
            onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
          >
            <Form.Check
              type="checkbox"
              label={display_values[index]}
              checked={selectedValues.includes(value)}
              onChange={() => handleCheckboxChange(value)}
            />
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default SelectCheckBox;
