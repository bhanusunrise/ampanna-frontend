'use client';

import SelectBox from "@/app/components/Forms/select_box";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { addUnitConversion, fetchAllUnitCategories, fetchAllUnits } from './functions'; // Assuming it's in the same directory
import NumberInput from "@/app/components/Forms/number_input";
import { ADD_BUTTON_LABAL, ADD_UNIT_CONVERSION, CLEAR_BUTTON_LABAL, FIRST_UNIT_NAME_LABAL, MULTIPLIER_LABAL, MULTIPLIER_PLACEHOLDER, SECOND_UNIT_NAME_LABAL, UNIT_CATEGORY_NAME_LABAL, UNIT_CONVERSION_PAGE_NAME, UNIT_CONVERSION_TABLE_FIELDS } from "@/app/constants/constants";
import ClearButton from "@/app/components/Buttons/clear_button";
import AddButton from "@/app/components/Buttons/add_button";
import BasicTable from "@/app/components/Tables/basic_table";

export default function Page() {
  const [firstUnitIds, setFirstUnitIds] = useState<string[]>([]); // Store unit IDs
  const [firstUnitNames, setFirstUnitNames] = useState<string[]>([]); // Store unit names
  const [selectedFirstUnitID, setSelectedFirstUnitID] = useState(''); // [selected first unit id
  const [secondUnitIds, setSecondUnitIds] = useState<string[]>([]); // Store unit IDs
  const [secondUnitNames, setSecondUnitNames] = useState<string[]>([]); // Store unit names
  const [selectedSecondUnitID, setSelectedSecondUnitID] = useState(''); // [selected second unit id
  const [unitCategoryIds, setUnitCategoryIds] = useState<string[]>([]); // Store unit category IDs
  const [unitCategoryNames, setUnitCategoryNames] = useState<string[]>([]); // Store unit category names
  const [selectedUnitCategory, setSelectedUnitCategory] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [loading, setLoading] = useState(true);

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
      if (!selectedUnitCategory) return; // Don't fetch if no category selected

      setLoading(true);
      const units = await fetchAllUnits(selectedUnitCategory);

      if (units.length > 0) {
        const unit_ids = units.map((unit: { unit_id: string }) => unit.unit_id);
        const unit_names = units.map((unit: { unit_name: string }) => unit.unit_name);

        // Populate both first and second unit options with the fetched units
        setFirstUnitIds(unit_ids);
        setFirstUnitNames(unit_names);
        setSecondUnitIds(unit_ids);
        setSecondUnitNames(unit_names);
      }else{
        setFirstUnitIds(['']);
        setFirstUnitNames(['']);
        setSecondUnitIds(['']);
        setSecondUnitNames(['']);
      }

      setLoading(false);
    };

    loadUnits();
  }, [selectedUnitCategory]); // Trigger whenever selectedUnitCategory changes


 const handleAddUnitConversion = async () => {
    if (!selectedFirstUnitID || !selectedSecondUnitID || !multiplier) {
        console.log('Please fill in all fields');
        return;
    }

    const payload = {
        unitFrom: selectedFirstUnitID,
        unitTo: selectedSecondUnitID,
        value: multiplier
    };
    
   // console.log('Payload to send:', payload); // Add this line

    const result = await addUnitConversion(selectedFirstUnitID, selectedSecondUnitID, multiplier);
    if (result.success) {
        // Reload or reset the state as necessary
        setSelectedFirstUnitID('');
        setSelectedSecondUnitID('');
        setMultiplier(0);
    } else {
        console.error(result.message); // Log error message
    }
};


  return (
    <>
      <Row>
        <Col md={6}><h3 className={'text-primary'}>{UNIT_CONVERSION_PAGE_NAME}</h3></Col>
        <Col md={6}>Add searchbar</Col>
        <br/>
      </Row>
      <Row>
        <Col md={8}>
        
        
        </Col>
        <Col md={4}>
          <h3 className={'text-primary'}>{ADD_UNIT_CONVERSION}</h3>
          
          {/* Show loading indicator until data is fetched */}
          {loading ? (
            <p>Loading unit conversions...</p>
          ) : (
            <>
              {/* Unit Category SelectBox */}
              <SelectBox
                values={unitCategoryIds}
                display_values={unitCategoryNames}
                label_name={UNIT_CATEGORY_NAME_LABAL}
                form_id="unit_category_select"
                onChange={(value) => setSelectedUnitCategory(value)} // Trigger unit load on change
                selected_value={selectedUnitCategory}
              />

              {/* From Unit SelectBox */}
              <SelectBox
                values={firstUnitIds}
                display_values={firstUnitNames}
                label_name={FIRST_UNIT_NAME_LABAL}
                form_id="first_unit_select"
                onChange={(value) => setSelectedFirstUnitID(value)}
                selected_value={selectedFirstUnitID}
              />

              {/* Multiplier Input */}
              <NumberInput
                 label={MULTIPLIER_LABAL}
                onChangeText={(e) => setMultiplier(Number(e.target.value))}
                form_id="multiplier"
                form_message=""
                placeholder_text={MULTIPLIER_PLACEHOLDER}
                min_value={0}
                max_value={9999999}
                value={multiplier}
              />

              {/* To Unit SelectBox */}
              <SelectBox
                values={secondUnitIds}
                display_values={secondUnitNames}
                label_name={SECOND_UNIT_NAME_LABAL}
                form_id="second_unit_select"
                onChange={(value) => setSelectedSecondUnitID(value)}
                selected_value={selectedSecondUnitID}
              />
              <br/>
              <ClearButton 
            label={CLEAR_BUTTON_LABAL}
            onClickButton={() => { 
              setSelectedUnitCategory(''); 
              setSelectedFirstUnitID(''); 
              setSelectedSecondUnitID('');
              setMultiplier(0);
              
            }} 
            btn_id="clear_unit" 
          />
          <AddButton
          label={ADD_BUTTON_LABAL}
          onClickButton={() => {
            handleAddUnitConversion();
            }}
            btn_id="add_unit"
            />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
