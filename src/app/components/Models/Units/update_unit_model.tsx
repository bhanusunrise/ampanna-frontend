'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SelectBox from '@/app/components/Forms/select_box'; // Adjust the import path as necessary
import { fetchAllUnitCategories } from '@/app/dashboard/units/functions'; // Adjust the import path as necessary

interface UpdateUnitModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnit: (unitData: { unit_name: string; abbreviation: string; unit_category_id: string }) => Promise<void>;
  unitName: string; // Current unit name
  abbreviation: string; // Current abbreviation
}

const UpdateUnitModal: React.FC<UpdateUnitModalProps> = ({ 
  show, 
  handleClose, 
  handleUpdateUnit, 
  unitName: initialUnitName, 
  abbreviation: initialAbbreviation 
}) => {
  const [unitName, setUnitName] = useState(initialUnitName);
  const [abbreviation, setAbbreviation] = useState(initialAbbreviation);
  const [unitCategories, setUnitCategories] = useState<string[]>([]); // State for unit categories
  const [unitCategoryId, setUnitCategoryId] = useState<string>(''); // State for selected category ID

  useEffect(() => {
    const loadUnitCategories = async () => {
      const categories = await fetchAllUnitCategories();
       setUnitCategories(categories.map((category: any) => ({ id: category.unit_category_id, name: category.unit_category_name })));
    };

    loadUnitCategories();
  }, []);

  // Reset state when modal opens or when props change
  useEffect(() => {
    if (show) {
      setUnitName(initialUnitName);
      setAbbreviation(initialAbbreviation);
      setUnitCategoryId(''); // Reset selected category when modal opens
    }
  }, [show, initialUnitName, initialAbbreviation]);

  const handleSubmit = async () => {
    await handleUpdateUnit({ unit_name: unitName, abbreviation, unit_category_id: unitCategoryId });
    handleClose(); // Close modal after update
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='bg-warning'>
        <Modal.Title>Update Unit</Modal.Title>
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

          {/* Select box for unit categories */}
          <SelectBox
            values={unitCategories.map(category => category.id)} // Provide the category IDs
            display_values={unitCategories.map(category => category.name)} // Adjust based on your data structure
            label_name="Select Unit Category"
            form_id="formUnitCategory"
            onChange={setUnitCategoryId} // Update selected category ID
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          Update Unit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUnitModal;
