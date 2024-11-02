import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateUnitCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnit: (unitCategoryData: { unit_category_name: string; default_status: string; }) => Promise<void>;
  unit_category_name: string;
  default_status: string;
}

const UpdateUnitCategoryModal: React.FC<UpdateUnitCategoryModalProps> = ({
  show,
  handleClose,
  handleUpdateUnit,
  unit_category_name: initialUnitCategoryName,
  default_status: initialUnitCategoryDefaultStatus,
}) => {
  const [unitCategoryName, setUnitCategoryName] = useState(initialUnitCategoryName);
  const [defaultStatus, setDefaultStatus] = useState(initialUnitCategoryDefaultStatus);

  // Reset values when modal opens or when props change
  useEffect(() => {
    if (show) {
      setUnitCategoryName(initialUnitCategoryName);
      setDefaultStatus(initialUnitCategoryDefaultStatus);
    }
  }, [show, initialUnitCategoryName, initialUnitCategoryDefaultStatus]);

  const handleSubmit = async () => {
    await handleUpdateUnit({
      unit_category_name: unitCategoryName,
      default_status: defaultStatus,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-warning">
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

export default UpdateUnitCategoryModal;
