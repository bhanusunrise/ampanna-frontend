'use client';  // Ensure this component is rendered on the client

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClickButton, btn_id }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClickButton(); // Trigger the button click when Enter key is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClickButton]);

  return (
    <Button variant="success" onClick={onClickButton} id={btn_id}>
      {label}
    </Button>
  );
};

export default AddButton;



