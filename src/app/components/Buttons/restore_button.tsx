'use client';  // Ensure this component is rendered on the client

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RestoreButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
  rowIndex: number; // Pass the row index for identification
}

const RestoreButton: React.FC<RestoreButtonProps> = ({ label, onClickButton, btn_id, rowIndex }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Delete key is pressed
      if (event.ctrlKey && event.altKey && event.key === (rowIndex + 1).toString()) {
        console.log(`Restoring row: ${rowIndex}`); // Debugging output
        onClickButton(); // Trigger the delete action
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
    };
  }, [onClickButton, rowIndex]);

  return (
    <Button variant="success" onClick={onClickButton} id={btn_id} className={'btn-sm'}>
      {label}
    </Button>
  );
};

export default RestoreButton;
