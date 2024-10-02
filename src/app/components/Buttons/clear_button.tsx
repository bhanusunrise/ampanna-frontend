'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ClearButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({ label, onClickButton, btn_id }) => {
  return (
    <Button variant="secondary" onClick={onClickButton} id={btn_id}>
      {label}
    </Button>
  );
};

export default ClearButton;