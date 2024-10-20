'use client';

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddUnitModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddUnit: (unitData: { unit_name: string; abbreviation: string }) => Promise<void>; // Make sure it returns a Promise
}

const AddUnitModal: React.FC<AddUnitModalProps> = ({ show, handleClose, handleAddUnit }) => {
  const [unitName, setUnitName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');

  const handleSubmit = async () => {
    await handleAddUnit({ unit_name: unitName, abbreviation });
    setUnitName(''); // Clear fields after successful submission
    setAbbreviation('');
    //handleClose(); // Close modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='bg-success'>
        <Modal.Title className='text-white'>New Unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUnitName">
            <Form.Label>Unit Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter unit name"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAbbreviation">
            <Form.Label>Abbreviation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter abbreviation"
              value={abbreviation}
              onChange={(e) => setAbbreviation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add Unit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default AddUnitModal;
