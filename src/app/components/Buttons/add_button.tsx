'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClickButton, btn_id }) => {
  return (
    <Button variant="success" onClick={onClickButton} id={btn_id}>
      {label}
    </Button>
  );
};

export default AddButton;


