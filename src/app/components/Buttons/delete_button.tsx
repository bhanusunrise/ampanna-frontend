'use client';  // Ensure this component is rendered on the client

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DeleteButtonProps {
  label: string;
  onClickButton: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ label, onClickButton }) => {
  return (
    <Button variant="danger" onClick={onClickButton}>
      {label}
    </Button>
  );
};

export default DeleteButton;