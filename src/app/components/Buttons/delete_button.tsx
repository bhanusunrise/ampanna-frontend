'use client';  // Ensure this component is rendered on the client

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DeleteButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
  rowIndex: number; // Pass the row index for identification
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ label, onClickButton, btn_id, rowIndex }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Delete key is pressed
      if (event.ctrlKey && event.altKey && event.key === (rowIndex + 1).toString()) {
        console.log(`Deleting row: ${rowIndex}`); // Debugging output
        onClickButton(); // Trigger the delete action
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
    };
  }, [onClickButton, rowIndex]);

  return (
    <Button variant="danger" onClick={onClickButton} id={btn_id} className={'btn-sm ms-2'}>
      {label}
    </Button>
  );
};

export default DeleteButton;
