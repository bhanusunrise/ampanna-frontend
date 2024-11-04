'use client';

import TextInput from "@/app/components/Forms/text_input";
import SelectCheckBox from "@/app/components/Forms/select_check_box";
import BasicTable from "@/app/components/Tables/basic_table";
import { ADD_BUTTON_LABAL, ADD_ITEM_CATEGORY, CLEAR_BUTTON_LABAL, DEFAULT_UNIT_NAME_LABAL, ITEM_CATEGORIES_PAGE_NAME, ITEM_CATEGORIES_TABLE_FIELDS, ITEM_CATEGORY_NAME_LABAL, ITEM_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_NAME_LABAL, UNIT_NAMES_LABAL } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchAllUnitCategories, fetchAllUnits } from "../unit_conversions/functions";
import { fetchMultipleUnits, addItemCategory } from "./functions"; // Import the addItemCategory function
import SelectBox from "@/app/components/Forms/select_box";
import ClearButton from "@/app/components/Buttons/clear_button";
import AddButton from "@/app/components/Buttons/add_button";

export default function Page() {
    const [itemCategoryName, setItemCategoryName] = useState('');
    const [selectedUnitCategory, setSelectedUnitCategory] = useState('');
    const [unitCategoryIds, setUnitCategoryIds] = useState<string[]>([]);
    const [unitCategoryNames, setUnitCategoryNames] = useState<string[]>([]);
    const [unitIds, setUnitIds] = useState<string[]>([]);
    const [unitNames, setUnitNames] = useState<string[]>([]);
    const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);
    const [filteredUnitIds, setFilteredUnitIds] = useState<string[]>([]);
    const [filteredUnitNames, setFilteredUnitNames] = useState<string[]>([]);
    const [selectedUnitId, setSelectedUnitId] = useState('');
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Fetch unit categories on component mount
    useEffect(() => {
        const loadUnitCategories = async () => {
            setLoading(true);
            const unitCategories = await fetchAllUnitCategories();

            if (unitCategories.length > 0) {
                const ids = unitCategories.map((unitCategory: { unit_category_id: string }) => unitCategory.unit_category_id);
                const names = unitCategories.map((unitCategory: { unit_category_name: string }) => unitCategory.unit_category_name);

                setUnitCategoryIds(ids);
                setUnitCategoryNames(names);
            }
            setLoading(false);
        };

        loadUnitCategories();
    }, []);

    // Fetch units whenever selectedUnitCategory changes
    useEffect(() => {
        const loadUnits = async () => {
            if (!selectedUnitCategory) return;

            setLoading(true);
            const units = await fetchAllUnits(selectedUnitCategory);

            if (units.length > 0) {
                const unit_ids = units.map((unit: { unit_id: string }) => unit.unit_id);
                const unit_names = units.map((unit: { unit_name: string }) => unit.unit_name);

                setUnitIds(unit_ids);
                setUnitNames(unit_names);
            } else {
                setUnitIds(['']);
                setUnitNames(['']);
            }

            setLoading(false);
        };

        loadUnits();
    }, [selectedUnitCategory]);

    // Fetch filtered units whenever selectedUnitIds changes
    useEffect(() => {
        const loadFilteredUnits = async () => {
            if (selectedUnitIds.length === 0) {
                setFilteredUnitIds([]);
                setFilteredUnitNames([]);
                return;
            }

            setLoading(true);
            try {
                const units = await fetchMultipleUnits(selectedUnitIds); // Fetch filtered units based on selected IDs
                const filtered_ids = units.map((unit: { unit_id: string }) => unit.unit_id);
                const filtered_names = units.map((unit: { unit_name: string }) => unit.unit_name);

                setFilteredUnitIds(filtered_ids);
                setFilteredUnitNames(filtered_names);
            } catch (error) {
                console.error("Error fetching filtered units:", error);
            }
            setLoading(false);
        };

        loadFilteredUnits();
    }, [selectedUnitIds]); // Trigger whenever selectedUnitIds changes

    // Clear the form fields
    const handleClearForm = () => {
        setItemCategoryName('');
        setSelectedUnitCategory('');
        setUnitIds([]); // This can stay as is
        setUnitNames([]); // This can stay as is
        setFilteredUnitIds([]);
        setFilteredUnitNames([]);
        setSelectedUnitId(''); // Clear selected unit ID
        setSelectedUnitIds([]); // Clear selected checkboxes
    };

    // Handle adding a new item category
    const handleAddItemCategory = async () => {
        try {
            const result = await addItemCategory(itemCategoryName, selectedUnitIds, selectedUnitId);
            console.log("Category added successfully:", result);
            // Optionally, you can clear the form after adding the category
            handleClearForm();
        } catch (error) {
            console.error("Failed to add item category:", error);
        }
    };

    return (
        <>
            <Row>
                <Col md={3}><h3 className={'text-primary'}>{ITEM_CATEGORIES_PAGE_NAME}</h3></Col>
                <Col md={6}><br /></Col>
            </Row>
            <Row>
                <Col md={9} />
                    <BasicTable 
                        table_fields={ITEM_CATEGORIES_TABLE_FIELDS}
                        />
                <Col md={3}>
                    <h3 className='text-primary'>{ADD_ITEM_CATEGORY}</h3>
                    <TextInput 
                        label={ITEM_CATEGORY_NAME_LABAL} 
                        onChangeText={(event) => setItemCategoryName(event.target.value)} 
                        form_id="item_category_name" 
                        placeholder_text={ITEM_CATEGORY_NAME_PLACEHOLDER} 
                        value={itemCategoryName} 
                        form_message={""} 
                    />
                    <SelectBox
                        values={unitCategoryIds}
                        display_values={unitCategoryNames}
                        label_name={UNIT_CATEGORY_NAME_LABAL}
                        form_id="unit_category_select"
                        onChange={(value) => setSelectedUnitCategory(value)}
                        selected_value={selectedUnitCategory}
                        disabled={selectedUnitIds.length > 0} // Disable if selectedUnitIds has items
                    />
                    <SelectCheckBox
                        values={unitIds}
                        display_values={unitNames}
                        label_name={UNIT_NAMES_LABAL}
                        form_id="unit_select"
                        onChange={(value) => setSelectedUnitIds(value)}
                        selected_values={selectedUnitIds}
                    />
                    <SelectBox
                        values={filteredUnitIds}
                        display_values={filteredUnitNames}
                        label_name={DEFAULT_UNIT_NAME_LABAL}
                        form_id="filtered_unit_select"
                        onChange={(value) => setSelectedUnitId(value)} // Handle selection
                        selected_value={selectedUnitId}
                        disabled={filteredUnitIds.length === 0} // Disable if no filtered units
                    />
                    <br />
                    <ClearButton
                        label={CLEAR_BUTTON_LABAL}
                        onClickButton={handleClearForm} // Call handleClearForm on click
                        btn_id="clear_button"
                    />
                    <AddButton
                        label={ADD_BUTTON_LABAL}
                        onClickButton={handleAddItemCategory} // Call handleAddItemCategory on click
                        btn_id="add_button"
                    />
                </Col>
            </Row>
        </>
    );
}
