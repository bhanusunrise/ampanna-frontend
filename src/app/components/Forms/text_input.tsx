import React from 'react';
import { Form } from 'react-bootstrap';

interface TextInputProps {
  label: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form_id: string;
  form_message: string;
  placeholder_text: string;
  value: string
}

const TextInput: React.FC<TextInputProps> = ({ label, onChangeText, form_id, form_message, placeholder_text, value }) => {
  return (
    <>
      <Form.Label htmlFor={form_id}>{label}</Form.Label>
      <Form.Control
        type="text"
        id={form_id}
        aria-describedby="passwordHelpBlock"
        onChange={onChangeText} // Attach onChangeText prop
        placeholder={placeholder_text}
        style={{ maxWidth: '300px' }}
        value={value}
      />
      <Form.Text id="passwordHelpBlock" muted>
        {form_message}
      </Form.Text>
    </>
  );
};

export default TextInput;
