import { BACK, ITEM_CATEGORY_NAME_LABAL, ITEM_CATEGORY_NAME_PLACEHOLDER, UPDATE_BUTTON_UPDATE_MODAL, UPDATE_ITEM_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateItemCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateItemCategory: (itemCategoryData: { category_name: string; }) => Promise<void>;
  item_category_name: string;
}

const UpdateItemCategoryModal: React.FC<UpdateItemCategoryModalProps> = ({
  show,
  handleClose,
  handleUpdateItemCategory,
  item_category_name: initialItemCategoryName,
}) => {
  const [itemCategoryName, setItemCategoryName] = useState(initialItemCategoryName);

  // Reset values when modal opens or when props change
  useEffect(() => {
    if (show) {
      setItemCategoryName(initialItemCategoryName);
    }
  }, [show, initialItemCategoryName]);

  const handleSubmit = async () => {
    await handleUpdateItemCategory({
      category_name: itemCategoryName,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>{UPDATE_ITEM_CATEGORY_MODEL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formItemCategoryName">
            <Form.Label>{ITEM_CATEGORY_NAME_LABAL}</Form.Label>
            <Form.Control
              type="text"
              placeholder={ITEM_CATEGORY_NAME_PLACEHOLDER}
              value={itemCategoryName}
              onChange={(e) => setItemCategoryName(e.target.value)}
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

export default UpdateItemCategoryModal;
