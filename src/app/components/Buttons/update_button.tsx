'use client'; 

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UpdateButtonProps {
  label: string;
  onClickButton: () => void;
  btn_id: string;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ label, onClickButton, btn_id }) => {
  return (
    <Button variant="warning" onClick={onClickButton} id={btn_id}>
      {label}
    </Button>
  );
};

export default UpdateButton;