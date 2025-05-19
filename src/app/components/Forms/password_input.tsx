'use client'

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PasswordInputProps {
  label: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message: string;
  placeholder_text: string;
  value: string

}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, onChangeText, form_id, form_message, placeholder_text, value }) => {
  return (
          <>
            <Form.Label htmlFor={form_id} className='text-primary'>{label}</Form.Label><Form.Control
                type="password" id={form_id} aria-describedby="passwordHelpBlock" onChange={onChangeText} placeholder={placeholder_text} size='sm' value={value}/><Form.Text id="passwordHelpBlock" muted>
                {form_message}
            </Form.Text>
          </>
  );
};

export default PasswordInput;