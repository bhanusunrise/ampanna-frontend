import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateUnitModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnit: (unitData: { unit_name: string; abbreviation: string; }) => Promise<void>;
  unitName: string;
  abbreviation: string;
}

const UpdateUnitModal: React.FC<UpdateUnitModalProps> = ({
  show,
  handleClose,
  handleUpdateUnit,
  unitName: initialUnitName,
  abbreviation: initialAbbreviation,
}) => {
  const [unitName, setUnitName] = useState(initialUnitName);
  const [abbreviation, setAbbreviation] = useState(initialAbbreviation);

  // Reset values when modal opens or when props change
  useEffect(() => {
    if (show) {
      setUnitName(initialUnitName);
      setAbbreviation(initialAbbreviation);
    }
  }, [show, initialUnitName, initialAbbreviation]);

  const handleSubmit = async () => {
    await handleUpdateUnit({
      unit_name: unitName,
      abbreviation,
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

export default UpdateUnitModal;
