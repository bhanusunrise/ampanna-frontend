'use client';

import BasicTable from "@/app/components/Tables/basic_table";
import SelectCheckBox from "@/app/components/Forms/select_check_box"; 
import { ITEMS_PAGE_NAME, ITEMS_TABLE_FIELDS, COMPULSARY, NULL_VALUE, ADD_ITEM_PAGE_NAME, ITEM_CATEGORY_SELECTION_LABAL, ADD_UNIT_CATEGORY_LABAL, ADD_UNITS_LABAL, ADD_MOST_USED_UNIT_LABAL, ITEM_INPUT_LABAL, ITEM_INPUT_PLACEHOLDER } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchItemsWithUnits, fetchActiveItemCategories, fetchActiveUnitCategories, fetchUnitsByCategory } from "./functions"; 
import SelectBox from "@/app/components/Forms/select_box";
import TextInput from "@/app/components/Forms/text_input";

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

  // New state for TextInput
  const [textInputValue, setTextInputValue] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  useEffect(() => {
    async function loadItemsData() {
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
    }

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

    loadItemsData();
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

  const isUnitCategoryDisabled = selectedUnitIds.length > 0;
  const isSelectedUnitIdsEmpty = selectedUnitIds.length === 0; 

  return (
    <>
      <Row>
        <Col md={3}><h3 className={'text-primary'}>{ITEMS_PAGE_NAME}</h3></Col>
        <Col md={6}>Add searchbar<br/></Col>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable table_fields={ITEMS_TABLE_FIELDS} table_records={items} table_id='table_1'/>
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
          {/* New TextInput component */}
          <TextInput
            label={ITEM_INPUT_LABAL} // Change the label as needed
            onChangeText={(event) => setTextInputValue(event.target.value)} // Update state on change
            form_id="idem_name" 
            placeholder_text={ITEM_INPUT_PLACEHOLDER} // Placeholder text
            value={textInputValue} // Bind state to input value
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
        </Col>
      </Row>
    </>
  );
}
