'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ClearButtonProps {
  label: string;
  onClickButton: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ label, onClickButton }) => {
  return (
    <Button variant="secondary" onClick={onClickButton}>
      {label}
    </Button>
  );
};

export default ClearButton;