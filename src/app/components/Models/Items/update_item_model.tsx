import {
  BACK,
  ITEM_INPUT_LABAL,
  ITEM_INPUT_PLACEHOLDER,
  ITEM_CATEGORY_SELECTION_LABAL,
  UNIT_CATEGORY_NAME_LABAL,
  UPDATE_BUTTON_UPDATE_MODAL,
  UPDATE_ITEM_MODEL_TITLE,
  SELECT_BOX_PLACEHOLDER,
  UNIT_NAMES_LABAL,
  DEFAULT_UNIT_NAME_LABAL,
} from '@/app/constants/constants';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface UpdateItemModelProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateItem: (itemData: {
    item_name: string;
    item_category: string;
    unit_category: string;
    unit: string;
    selected_unit: string;
  }) => Promise<void>;
  item_name: string;
  item_categories: string[];
  unit_categories: string[];
  units: string[];
  selectedUnits: string[];
}

const UpdateItemModel: React.FC<UpdateItemModelProps> = ({
  show,
  handleClose,
  handleUpdateItem,
  item_name: initialItemName,
  item_categories,
  unit_categories,
  units,
  selectedUnits,
}) => {
  const [itemName, setItemName] = useState(initialItemName);
  const [itemCategory, setItemCategory] = useState('');
  const [unitCategory, setUnitCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  useEffect(() => {
    if (show) {
      setItemName(initialItemName);
      setItemCategory('');
      setUnitCategory('');
      setUnit('');
      setSelectedUnit('');
    }
  }, [show, initialItemName]);

  const handleSubmit = async () => {
    await handleUpdateItem({
      item_name: itemName,
      item_category: itemCategory,
      unit_category: unitCategory,
      unit: unit,
      selected_unit: selectedUnit,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>{UPDATE_ITEM_MODEL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formItemName">
            <Form.Label>{ITEM_INPUT_LABAL}</Form.Label>
            <Form.Control
              type="text"
              placeholder={ITEM_INPUT_PLACEHOLDER}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formItemCategory">
            <Form.Label>{ITEM_CATEGORY_SELECTION_LABAL}</Form.Label>
            <Form.Control
              as="select"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              <option value="">{SELECT_BOX_PLACEHOLDER}</option>
              {item_categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formUnitCategory">
            <Form.Label>{UNIT_CATEGORY_NAME_LABAL}</Form.Label>
            <Form.Control
              as="select"
              value={unitCategory}
              onChange={(e) => setUnitCategory(e.target.value)}
            >
              <option value="">{SELECT_BOX_PLACEHOLDER}</option>
              {unit_categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formUnit">
            <Form.Label>{UNIT_NAMES_LABAL}</Form.Label>
            <Form.Control
              as="select"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="">{SELECT_BOX_PLACEHOLDER}</option>
              {units.map((unitOption, index) => (
                <option key={index} value={unitOption}>
                  {unitOption}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSelectedUnit">
            <Form.Label>{DEFAULT_UNIT_NAME_LABAL}</Form.Label>
            <Form.Control
              as="select"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="">{SELECT_BOX_PLACEHOLDER}</option>
              {selectedUnits.map((selectedUnitOption, index) => (
                <option key={index} value={selectedUnitOption}>
                  {selectedUnitOption}
                </option>
              ))}
            </Form.Control>
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

export default UpdateItemModel;
