'use client'; 

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UpdateButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
  rowIndex: number; // Pass the row index for identification
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ label, onClickButton, btn_id, rowIndex }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Shift key and the corresponding number key are pressed
      if (!event.ctrlKey && event.altKey && event.key === (rowIndex + 1).toString()) {
        console.log(`Updating row: ${rowIndex}`); // Debugging output
        onClickButton(); // Trigger the update action
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
    };
  }, [onClickButton, rowIndex]);

  return (
    <Button variant="warning" onClick={onClickButton} id={btn_id} className={'btn-sm'}>
      {label}
    </Button>
  );
};

export default UpdateButton;
