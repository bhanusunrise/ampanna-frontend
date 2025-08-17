'use client';

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddButtonProps {
  label: string;
  onClickButton?: () => void;
  btn_id: string;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClickButton, btn_id }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClickButton?.(); // safe call if provided
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClickButton]);

  return (
    <Button
      variant="primary"
      id={btn_id}
      className="ms-2"
      onClick={() => onClickButton?.()} // safe call if provided
    >
      {label}
    </Button>
  );
};

export default AddButton;
