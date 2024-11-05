'use client';

import BasicTable from "@/app/components/Tables/basic_table";
import SelectCheckBox from "@/app/components/Forms/select_check_box";
import { ITEMS_PAGE_NAME, ITEMS_TABLE_FIELDS, COMPULSARY, NULL_VALUE, ADD_ITEM_PAGE_NAME, ITEM_CATEGORY_SELECTION_LABAL, ADD_UNIT_CATEGORY_LABAL, ADD_UNITS_LABAL, ADD_MOST_USED_UNIT_LABAL, ITEM_INPUT_LABAL, ITEM_INPUT_PLACEHOLDER, CLEAR_BUTTON_LABAL, ADD_BUTTON_LABAL } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchItemsWithUnits, fetchActiveItemCategories, fetchActiveUnitCategories, fetchUnitsByCategory, addItemWithUnits } from "./functions";
import SelectBox from "@/app/components/Forms/select_box";
import TextInput from "@/app/components/Forms/text_input";
import ClearButton from "@/app/components/Buttons/clear_button";
import AddButton from "@/app/components/Buttons/add_button";
import NavigateButtons from "@/app/components/Buttons/navigate_button";
import DeleteModal from "@/app/components/Models/delete_model";
import { deleteIteam } from "./functions";

export default function Page() {
  const [items, setItems] = useState<string[][]>([]);
  const [filteredItems, setFilteredItems] = useState<string[][]>([]);
  const [activeItemCategories, setActiveItemCategories] = useState<any[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [activeUnitCategories, setActiveUnitCategories] = useState<any[]>([]);
  const [unitCategoryIds, setUnitCategoryIds] = useState<string[]>([]);
  const [unitCategoryNames, setUnitCategoryNames] = useState<string[]>([]);
  const [selectedItemCategoryId, setSelectedItemCategoryId] = useState('');
  const [selectedUnitCategoryId, setSelectedUnitCategoryId] = useState('');
  const [unitIds, setUnitIds] = useState<string[]>([]);
  const [unitNames, setUnitNames] = useState<string[]>([]);
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);
  const [selectedUnitIdsForNewSelectBox, setSelectedUnitIdsForNewSelectBox] = useState<string[]>([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const recordsPerPage = 10;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const reloadData = async () => {
    const fetchedItems = await fetchItemsWithUnits();
    const processedItems = fetchedItems.map((item: any) => {
      const unitNames = item.units.map((unit: any) => unit.unit_name).join(', ');
      const defaultUnit = item.units.find((unit: any) => unit.default_status === COMPULSARY);
      const defaultUnitName = defaultUnit ? defaultUnit.unit_name : NULL_VALUE;

      return [
        item.item_id,
        item.item_name + "\n(" + item.item_category_name + ")",
        item.item_barcode,
        unitNames,
        defaultUnitName,
        formatDate(item.createdAt),
        formatDate(item.updatedAt),
        item.status,
      ];
    });

    setItems(processedItems);
    setFilteredItems(processedItems);
  };

  useEffect(() => {
    reloadData();

    async function loadActiveItemCategories() {
      const fetchedCategories = await fetchActiveItemCategories();
      setActiveItemCategories(fetchedCategories || []);
      if (fetchedCategories) {
        const ids = fetchedCategories.map(category => category.category_id);
        const names = fetchedCategories.map(category => category.category_name);
        setCategoryIds(ids);
        setCategoryNames(names);
      }
    }

    async function loadActiveUnitCategories() {
      const fetchedUnitCategories = await fetchActiveUnitCategories();
      setActiveUnitCategories(fetchedUnitCategories || []);
      if (fetchedUnitCategories) {
        const ids = fetchedUnitCategories.map(category => category.unit_category_id);
        const names = fetchedUnitCategories.map(category => category.unit_category_name);
        setUnitCategoryIds(ids);
        setUnitCategoryNames(names);
      }
    }

    loadActiveItemCategories();
    loadActiveUnitCategories();
  }, []);

  useEffect(() => {
    async function loadUnitsByCategory() {
      if (selectedUnitCategoryId) {
        const fetchedUnits = await fetchUnitsByCategory(selectedUnitCategoryId);
        console.log('Fetched Units:', fetchedUnits);
        if (fetchedUnits) {
          const ids = fetchedUnits.map((unit: any) => unit.unit_id);
          const names = fetchedUnits.map((unit: any) => unit.unit_name);
          setUnitIds(ids);
          setUnitNames(names);
        }
      }
    }

    loadUnitsByCategory();
  }, [selectedUnitCategoryId]);

  const handleClear = () => {
    setSelectedItemCategoryId('');
    setSelectedUnitCategoryId('');
    setSelectedUnitIds([]);
    setSelectedUnitIdsForNewSelectBox([]);
    setTextInputValue('');
  };

  const handleAddItem = async () => {
    if (!selectedItemCategoryId || !textInputValue || selectedUnitIds.length === 0) {
      alert("Please fill all fields before adding an item.");
      return;
    }

    const units = selectedUnitIds.map(unit_id => ({
      unit_id,
      default_status: selectedUnitIdsForNewSelectBox.includes(unit_id) ? COMPULSARY : undefined
    }));

    const result = await addItemWithUnits(selectedItemCategoryId, textInputValue, units);
    if (result) {
      alert("Item added successfully!");
      handleClear();
      await reloadData(); // Reload data after adding an item
    } else {
      alert("Failed to add item. Please try again.");
    }
  };

  const isUnitCategoryDisabled = selectedUnitIds.length > 0;
  const isSelectedUnitIdsEmpty = selectedUnitIds.length === 0;

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredItems.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = filteredItems.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);
  const startingIndex = currentPage * recordsPerPage;

  const handleDeleteItem = (rowIndex: number) => {
    const selectedItemData = filteredItems[rowIndex];
    setItemToDelete({
      item_id: selectedItemData[0],
      item_name: selectedItemData[1],
    });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteIteam(itemToDelete.item_id);
      if (result.success) {
        await reloadData(); // Reload data after deleting an item
        handleCloseDeleteModal();
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      <Row>
        <Col md={3}><h3 className={'text-primary'}>{ITEMS_PAGE_NAME}</h3></Col>
        <Col md={6}>Add searchbar<br/></Col>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable 
            table_fields={ITEMS_TABLE_FIELDS} 
            table_records={items} 
            table_id='table_1'
            startingIndex={startingIndex}
            onDelete={handleDeleteItem}
          />
          <NavigateButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Col>
        <Col md={3}>
          <h3 className={'text-primary'}>{ADD_ITEM_PAGE_NAME}</h3>
          <SelectBox 
            values={categoryIds}
            display_values={categoryNames}
            label_name={ITEM_CATEGORY_SELECTION_LABAL}
            form_id="item_category_id"
            onChange={(value) => setSelectedItemCategoryId(value)} 
            selected_value={selectedItemCategoryId}
          />
          <TextInput
            label={ITEM_INPUT_LABAL}
            onChangeText={(event) => setTextInputValue(event.target.value)}
            form_id="item_name"
            placeholder_text={ITEM_INPUT_PLACEHOLDER}
            value={textInputValue}
          />
          <SelectBox 
            values={unitCategoryIds}
            display_values={unitCategoryNames}
            label_name={ADD_UNIT_CATEGORY_LABAL}
            form_id="unit_category_id"
            onChange={(value) => setSelectedUnitCategoryId(value)} 
            selected_value={selectedUnitCategoryId}
            disabled={isUnitCategoryDisabled}
          />
          <SelectCheckBox 
            values={unitIds}
            display_values={unitNames}
            label_name={ADD_UNITS_LABAL}
            form_id="unit_ids"
            onChange={setSelectedUnitIds}
            selected_values={selectedUnitIds}
          />
          <SelectBox 
            values={selectedUnitIds}
            display_values={unitNames}
            label_name={ADD_MOST_USED_UNIT_LABAL}
            form_id="selected_unit_ids"
            onChange={setSelectedUnitIdsForNewSelectBox}
            selected_value={selectedUnitIdsForNewSelectBox}
            disabled={isSelectedUnitIdsEmpty}
          />
          <ClearButton
            label={CLEAR_BUTTON_LABAL}
            onClickButton={handleClear}
            btn_id="clear_button"
          />
          <AddButton
            label={ADD_BUTTON_LABAL}
            onClickButton={handleAddItem}
            btn_id="add_button"
          />
        </Col>
      </Row>

      {itemToDelete && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={confirmDelete}
          itemName={itemToDelete.item_name}
        />
      )}
    </>
  );
}
