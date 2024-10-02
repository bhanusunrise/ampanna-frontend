'use client'

import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TextInputProps {
  label: string;
  onChangeText: () => void;
  form_id: string;
  form_message: string;
  placeholder_text: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, onChangeText, form_id, form_message, placeholder_text }) => {
  return (
          <>
            <Form.Label htmlFor={form_id}>{label}</Form.Label><Form.Control
                type="text" id={form_id} aria-describedby="passwordHelpBlock" onChange={onChangeText} placeholder={placeholder_text}/><Form.Text id="passwordHelpBlock" muted>
                {form_message}
            </Form.Text>
          </>
  );
};

export default TextInput;

