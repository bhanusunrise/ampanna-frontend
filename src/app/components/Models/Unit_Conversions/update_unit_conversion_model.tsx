import { BACK, CLEAR_BUTTON_LABAL, FIRST_UNIT_LABEL, MULTIPLIER_LABAL, SECOND_UNIT_LABEL, UPDATE_BUTTON_UPDATE_MODAL, UPDATE_UNIT_CONVERSION_MODEL_TITLE } from '@/app/constants/constants';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateUnitConversionModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnitConversion: (unitConversionData: { multiplier: number }) => Promise<void>;
  firstUnit: string;
  initialMultiplier: number;
  secondUnit: string;
}

const UpdateUnitConversionModal: React.FC<UpdateUnitConversionModalProps> = ({
  show,
  handleClose,
  handleUpdateUnitConversion,
  firstUnit,
  initialMultiplier,
  secondUnit,
}) => {
  const [multiplier, setMultiplier] = useState(initialMultiplier);

  // Reset values when modal opens or when props change
  useEffect(() => {
    if (show) {
      setMultiplier(initialMultiplier);
    }
  }, [show, initialMultiplier]);

  const handleSubmit = async () => {
    await handleUpdateUnitConversion({
      multiplier,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>{UPDATE_UNIT_CONVERSION_MODEL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* First Unit (Disabled) */}
          <Form.Group controlId="formFirstUnit">
            <Form.Label>{FIRST_UNIT_LABEL}</Form.Label>
            <Form.Control
              type="text"
              value={firstUnit}
              disabled
            />
          </Form.Group>

          {/* Multiplier (Number Input with min and max) */}
          <Form.Group controlId="formMultiplier">
            <Form.Label>{MULTIPLIER_LABAL}</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={9999999}
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
            />
          </Form.Group>

          {/* Second Unit (Disabled) */}
          <Form.Group controlId="formSecondUnit">
            <Form.Label>{SECOND_UNIT_LABEL}</Form.Label>
            <Form.Control
              type="text"
              value={secondUnit}
              disabled
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

