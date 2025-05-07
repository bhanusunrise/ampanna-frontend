'use client'

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UpdateModelProps } from '../../interfaces/models/update_model_interface';
import TextInput from '../Forms/text_input'
import NumberInput from '../Forms/number_input'

const UpdateModel: React.FC<UpdateModelProps> = ({
  modelName,
  textInputs = [],
  numberInputs = [],
  updateFunction,
  show,
  handleClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFunction();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-primary'>{modelName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {textInputs.map((input, index) => (
            <TextInput
              key={`text-input-${index}`}
              label={input.label}
              placeholder={input.placeholder}
              value={input.value }
              onChange={input.onChange}
              required={input.required}
            />
          ))}
          
          {numberInputs.map((input, index) => (
            <NumberInput
              key={`number-input-${index}`}
              label={input.label}
              placeholder={input.placeholder}
              value={input.value}
              min={input.min}
              max={input.max}
              onChange={input.onChange}
              required={input.required}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={updateFunction}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModel;