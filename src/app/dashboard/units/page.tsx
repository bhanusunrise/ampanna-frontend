'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnits, addUnit } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [filteredUnits, setFilteredUnits] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitName, setUnitName] = useState(''); // State for unit name
  const [unitAbbreviation, setUnitAbbreviation] = useState(''); // State for unit abbreviation
  const recordsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const fetchedUnits = await fetchAllUnits();
      setUnits(
        fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation])
      );
      setFilteredUnits(
        fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation])
      );
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredUnits.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = filteredUnits.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);
  const totalPages = Math.ceil(filteredUnits.length / recordsPerPage);
  const startingIndex = currentPage * recordsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = units.filter(
      (unit) =>
        unit[1].toLowerCase().includes(query) || unit[2].toLowerCase().includes(query)
    );
    setFilteredUnits(filtered);
    setCurrentPage(0);
  };

  const handleAddUnit = async () => {
    if (!unitName || !unitAbbreviation) {
      alert('Please fill in both unit name and abbreviation.'); // Simple validation
      return;
    }

    const unitData = { unit_name: unitName, abbreviation: unitAbbreviation }; // Create unit data object
    const result = await addUnit(unitData.unit_name, unitData.abbreviation);

    // Check if the addition was successful
    if (result.success) {
      const updatedUnits = await fetchAllUnits();
      const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation]);
      setUnits(formattedUnits);
      setFilteredUnits(formattedUnits);
      
      // Clear the input fields after adding
      setUnitName('');
      setUnitAbbreviation('');
    } else {
      alert(result.message); // Show error message if addition failed
    }
  };

  const handleUpdate = (rowIndex: number) => {
    // Handle the update functionality here, e.g., open a modal with the record details
    console.log(`Update record at index: ${rowIndex}`);
  };

  const handleDelete = async (rowIndex: number) => {    
    console.log(`Delete record at index: ${rowIndex}`);
  };

  return (
    <>
      <Row>
        <Col md={3}><h3 className={'text-primary'}>Units</h3></Col>
        <Col md={5}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'nowrap' }}>
            <TextInput
              form_id="search_unit"
              onChangeText={handleSearch}
              form_message=""
              placeholder_text="Search"
              label=""
            />
          </div>
          <br />
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={8}>
          <BasicTable
            table_fields={UNIT_TABLE_FIELDS}
            table_records={currentRecords}
            table_id="units_table"
            startingIndex={startingIndex}
            onUpdate={handleUpdate} // Pass handleUpdate
            onDelete={handleDelete} // Pass handleDelete
          />
          <NavigateButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Col>
        <Col md={4}>
          <h3 className='text-primary'>New Unit</h3>
          <TextInput 
            form_id="unit_name"
            onChangeText={(event) => setUnitName(event.target.value)} // Update unit name state
            form_message=""
            placeholder_text="Enter Unit Name"
            label="Unit Name :"
            value={unitName} // Bind the value to unitName state
          />
          <TextInput 
            form_id="unit_abbreviation"
            onChangeText={(event) => setUnitAbbreviation(event.target.value)} // Update unit abbreviation state
            form_message=""
            placeholder_text="Enter Unit Abbreviation"
            label="Unit Abbreviation :"
            value={unitAbbreviation} // Bind the value to unitAbbreviation state
          />

          <br/>

          <ClearButton 
            label="Clear" 
            onClickButton={() => { 
              setUnitName(''); 
              setUnitAbbreviation(''); 
            }} 
            btn_id="clear_unit" 
          />
          <AddButton label="Add New" onClickButton={handleAddUnit} btn_id="add_unit" />
          <br/><br/>
          <h3 className='text-primary'>Total Units</h3>
        </Col>
      </Row>
    </>
  );
}
