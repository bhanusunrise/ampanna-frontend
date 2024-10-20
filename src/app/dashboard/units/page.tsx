'use client'; 

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnits, addUnit, deleteUnit } from './functions'; // Ensure this import is correct
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import AddUnitModal from '@/app/components/Models/Units/add_unit_model';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [filteredUnits, setFilteredUnits] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
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

  const handleAddUnit = async (unitData: { unit_name: string; abbreviation: string }) => {
    await addUnit(unitData.unit_name, unitData.abbreviation);
    const updatedUnits = await fetchAllUnits();
    const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation]);
    setUnits(formattedUnits);
    setFilteredUnits(formattedUnits);
  };

  const handleUpdate = (rowIndex: number) => {
    // Handle the update functionality here, e.g., open a modal with the record details
    console.log(`Update record at index: ${rowIndex}`);
  };

  const handleDelete = async (rowIndex: number) => {
    /*
    const unitId = filteredUnits[rowIndex][0]; // Assuming unit_id is the first element
    await deleteUnit(unitId); // Call the function to delete the unit
    const updatedUnits = await fetchAllUnits();
    const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation]);
    setUnits(formattedUnits);
    setFilteredUnits(formattedUnits);
    
    */
   console.log(`Delete record at index: ${rowIndex}`);
  };

  return (
    <>
      <Row>
        <Col md={6}><h1>Units</h1></Col>
        <Col md={6}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
            <AddButton label="New Unit" onClickButton={() => setShowModal(true)} btn_id="add_unit" />
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
      </Row>
      <Row className='text-center'>
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
      </Row>

      <AddUnitModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAddUnit={handleAddUnit}
      />
    </>
  );
}
