import { BACK, UNIT_ABBRAVIATION_LABAL, UNIT_ABBRAVIATION_PLACEHOLDER, UNIT_NAME_LABAL, UNIT_NAME_PLACEHOLDER, UPDATE_BUTTON_UPDATE_MODAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateUnitConversionModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnit: (unitConversionData: { unit_name: string; abbreviation: string; }) => Promise<void>;
  unitName: string;
  abbreviation: string;
}

const UpdateUnitConversionModal: React.FC<UpdateUnitConversionModalProps> = ({
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
        <Modal.Title>{UPDATE_UNIT_CATEGORY_MODEL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUnitName">
            <Form.Label>{UNIT_NAME_LABAL}</Form.Label>
            <Form.Control
              type="text"
              placeholder={UNIT_NAME_PLACEHOLDER}
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAbbreviation">
            <Form.Label>{UNIT_ABBRAVIATION_LABAL}</Form.Label>
            <Form.Control
              type="text"
              placeholder={UNIT_ABBRAVIATION_PLACEHOLDER}
              value={abbreviation}
              onChange={(e) => setAbbreviation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {BACK}
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          {UPDATE_BUTTON_UPDATE_MODAL}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUnitConversionModal;
