'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DeleteButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ label, onClickButton, btn_id }) => {
  return (
    <Button variant="danger" onClick={onClickButton} id={btn_id} className='ms-2'>
      {label}
    </Button>
  );
};

export default DeleteButton;