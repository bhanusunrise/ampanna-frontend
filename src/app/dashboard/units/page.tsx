'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnits, addUnit, updateUnit, blankFunction, deleteUnit, RestoreUnit } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import UpdateUnitModal from '@/app/components/Models/Units/update_unit_model';
import DeleteModal from '@/app/components/Models/delete_model'; // Import DeleteModal
import Summary from '@/app/components/Summeris/summery';
import RestoreModal from '@/app/components/Models/restore_model';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [filteredUnits, setFilteredUnits] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitName, setUnitName] = useState('');
  const [unitAbbreviation, setUnitAbbreviation] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const recordsPerPage = 10;
  const [itemToDelete, setItemToDelete] = useState<any>(null); // Track item to be deleted
  const [showRestoreModal, setShowRestoreModal] = useState(false); // State for restore modal


  useEffect(() => {
    async function fetchData() {
      const fetchedUnits = await fetchAllUnits();
      setUnits(fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]));
      setFilteredUnits(fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]));
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
      return;
    }

    const unitData = { unit_name: unitName, abbreviation: unitAbbreviation };
    const result = await addUnit(unitData.unit_name, unitData.abbreviation);

    if (result.success) {
      const updatedUnits = await fetchAllUnits();
      const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]);
      setUnits(formattedUnits);
      setFilteredUnits(formattedUnits);

      setUnitName('');
      setUnitAbbreviation('');
    }
  };

  const handleUpdate = (rowIndex: number) => {
    const selectedUnitData = filteredUnits[rowIndex];

    setSelectedUnit({
      unit_id: selectedUnitData[0],
      unit_name: selectedUnitData[1],
      abbreviation: selectedUnitData[2],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateUnit = async (unitData: { status: any; unit_name: string; abbreviation: string }) => {
    const result = await updateUnit(selectedUnit.unit_id, unitData.unit_name, unitData.abbreviation, unitData.status);

    handleCloseModal();
    const updatedUnits = await fetchAllUnits();
    const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]);
    setUnits(formattedUnits);
    setFilteredUnits(formattedUnits);
  };

  const handleDelete = (rowIndex: number) => {
    const unitToDelete = filteredUnits[rowIndex];
    setItemToDelete({
      unit_id: unitToDelete[0],
      unit_name: unitToDelete[1],
    });
    setShowDeleteModal(true); // Open the delete modal
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteUnit(itemToDelete.unit_id);/*
      if (result.success) {
        const updatedUnits = await fetchAllUnits();
        const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]);
        setUnits(formattedUnits);
        setFilteredUnits(formattedUnits);
      }*/

      const updatedUnits = await fetchAllUnits();
        const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.status]);
        setUnits(formattedUnits);
        setFilteredUnits(formattedUnits);

      setShowDeleteModal(false); // Close modal after deletion
      setItemToDelete(null); // Clear the selected item
    }
  };

  const handleRestore = (rowIndex: number) => {
  const unitToRestore = filteredUnits[rowIndex];
  setItemToDelete({
    unit_id: unitToRestore[0],
    unit_name: unitToRestore[1],
  });
  setShowRestoreModal(true); // Open the restore modal
};

const confirmRestore = async () => {
  if (itemToDelete) {
    const result = await RestoreUnit(itemToDelete.unit_id);
    
    if (result.success) {
      const updatedUnits = await fetchAllUnits();
      const formattedUnits = updatedUnits.map((unit: any) => [
        unit.unit_id,
        unit.unit_name,
        unit.abbreviation,
        unit.status,
      ]);
      setUnits(formattedUnits);
      setFilteredUnits(formattedUnits);
    }
    
    setShowRestoreModal(false); // Close modal after restoration
    setItemToDelete(null); // Clear the selected item
  }
};


  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedUnit(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleCloseRestoreModal = () => {
  setShowRestoreModal(false);
  setItemToDelete(null);
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
              value={searchQuery}
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
  onUpdate={handleUpdate}
  onDelete={handleDelete}
  onRestore={handleRestore}  // <-- Add this line
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
            onChangeText={(event) => setUnitName(event.target.value)}
            form_message=""
            placeholder_text="Enter Unit Name"
            label="Unit Name :"
            value={unitName}
          />
          <TextInput 
            form_id="unit_abbreviation"
            onChangeText={(event) => setUnitAbbreviation(event.target.value)}
            form_message=""
            placeholder_text="Enter Unit Abbreviation"
            label="Unit Abbreviation :"
            value={unitAbbreviation}
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
          <Summary 
            fields={["Active Units", "Updated Units", "Deleted Units"]}
            values={[units.filter((unit) => unit[3] === 'active').length, units.filter((unit) => unit[3] === 'updated').length, units.filter((unit) => unit[3] === 'deleted').length]}
          />
        </Col>
      </Row>

      {/* Update Unit Modal */}
      {selectedUnit && (
        <UpdateUnitModal
          show={showUpdateModal}
          handleClose={handleCloseModal}
          handleUpdateUnit={handleUpdateUnit}
          unitName={selectedUnit.unit_name}
          abbreviation={selectedUnit.abbreviation}
        />
      )}

      {/* Delete Unit Modal */}
      {itemToDelete && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={confirmDelete}
          itemName={itemToDelete.unit_name}
        />
      )}

      {/* Restore Unit Modal */}
{itemToDelete && (
  <RestoreModal
    show={showRestoreModal}
    handleClose={handleCloseRestoreModal}
    handleRestore={confirmRestore}
    itemName={itemToDelete.unit_name}
  />
)}

    </>
  );
}
