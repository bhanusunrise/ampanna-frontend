'use client'; 

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UpdateButtonProps {
  label: string;
  onClickButton: () => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ label, onClickButton }) => {
  return (
    <Button variant="warning" onClick={onClickButton}>
      {label}
    </Button>
  );
};

export default UpdateButton;