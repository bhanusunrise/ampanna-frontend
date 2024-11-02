import { CLEAR_BUTTON_LABAL, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_TYPE_LABAL, UPDATE_BUTTON_UPDATE_MODAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateUnitCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateUnitCategory: (unitCategoryData: { unit_category_name: string; default_status: string; }) => Promise<void>;
  unit_category_name: string;
  default_status: string;
}

const UpdateUnitCategoryModal: React.FC<UpdateUnitCategoryModalProps> = ({
  show,
  handleClose,
  handleUpdateUnitCategory,
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
    await handleUpdateUnitCategory({
      unit_category_name: unitCategoryName,
      default_status: defaultStatus,
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
          <Form.Group controlId="formUnitCategoryName">
            <Form.Label>{UNIT_CATEGORY_NAME_LABAL}</Form.Label>
            <Form.Control
              type="text"
              placeholder={UNIT_CATEGORY_NAME_PLACEHOLDER}
              value={unitCategoryName}
              onChange={(e) => setUnitCategoryName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUnitCategoryType">
            <Form.Label>Abbreviation</Form.Label>
            <Form.Control
              type="text"
              placeholder={UNIT_CATEGORY_TYPE_LABAL}
              value={defaultStatus}
              onChange={(e) => setDefaultStatus(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {CLEAR_BUTTON_LABAL}
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          {UPDATE_BUTTON_UPDATE_MODAL}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUnitCategoryModal;
