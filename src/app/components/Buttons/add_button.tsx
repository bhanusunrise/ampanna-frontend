'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddButtonProps {
  label: string;
  onClickButton: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClickButton }) => {
  return (
    <Button variant="primary" onClick={onClickButton}>
      {label}
    </Button>
  );
};

export default AddButton;


