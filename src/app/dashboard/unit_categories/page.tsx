'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { ADD_UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UNIT_CATEGORY_TYPE_LABAL, UNIT_CATEGORY_TYPES } from '@/app/constants/constants';
//import { fetchAllUnits, addUnit, updateUnit, blankFunction, deleteUnit, RestoreUnit, fetchAllUnitCategories } from './functions';
import { fetchAllUnitCategories } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import UpdateUnitModal from '@/app/components/Models/Units/update_unit_model';
import DeleteModal from '@/app/components/Models/delete_model'; // Import DeleteModal
import Summary from '@/app/components/Summeris/summery';
import RestoreModal from '@/app/components/Models/restore_model';
import SelectBox from '@/app/components/Forms/select_box';
import { fetchAllUnits } from '../unit_conversions/functions';
import { addUnit, updateUnit, deleteUnit, RestoreUnit } from '../units/functions';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [filteredUnitCategories, setFilteredUnitCategories] = useState<string[][]>([]);
  const [unitCategories, setUnitCategories] = useState<{ id: string; name: string }[]>([]); // State for unit categories
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitName, setUnitName] = useState('');
  const [unitAbbreviation, setUnitAbbreviation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for selected category
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const recordsPerPage = 10;
  const [itemToDelete, setItemToDelete] = useState<any>(null); // Track item to be deleted
  const [showRestoreModal, setShowRestoreModal] = useState(false); // State for restore modal

    // Utility function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  };


  useEffect(() => {
    async function fetchData() {
      const fetchedUnitCategories = await fetchAllUnitCategories();
      setUnitCategories(fetchedUnitCategories.map((unit_category: any) => [unit_category.unit_category_id, unit_category.unit_category_name ,unit_category.status,unit_category.default_status, formatDate(unit_category.createdAt), formatDate(unit_category.updatedAt)]));
      setFilteredUnitCategories(fetchedUnitCategories.map((unit_category: any) => [unit_category.unit_category_id, unit_category.unit_category_name ,unit_category.status,unit_category.default_status,  formatDate(unit_category.createdAt), formatDate(unit_category.updatedAt)]));
      
      /*
      // Fetch unit categories
      const fetchedCategories = await fetchAllUnitCategories();
      setUnitCategories(fetchedCategories.map((category: any) => ({ id: category.unit_category_id, name: category.unit_category_name })));*/
    
    }

    fetchData();
  }, []);

  
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredUnitCategories.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = filteredUnitCategories.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);
  const totalPages = Math.ceil(filteredUnitCategories.length / recordsPerPage);
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
      console.log(selectedCategory)
    if (!unitName || !unitAbbreviation || !selectedCategory) {
        console.log("Please fill in all fields");
        return;
    }

    const unitData = { unit_name: unitName, abbreviation: unitAbbreviation, unit_category_id: selectedCategory };
    console.log("Adding unit:", unitData); // Log the unit data

    const result = await addUnit(unitData.unit_name, unitData.abbreviation, unitData.unit_category_id);
    console.log("Add Unit Result:", result); // Log the result of the addition

    if (result.success) {
        const updatedUnits = await fetchAllUnits();
        const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.unit_category_name ,unit.status, formatDate(unit.createdAt), formatDate(unit.updatedAt)]);
        setUnits(formattedUnits);
        setFilteredUnits(formattedUnits);

        setUnitName('');
        setUnitAbbreviation('');
        setSelectedCategory(''); // Clear selected category
    }
};

  const handleUpdate = (rowIndex: number) => {
    const selectedUnitData = filteredUnits[rowIndex];

    setSelectedUnit({
      unit_id: selectedUnitData[0],
      unit_name: selectedUnitData[1],
      abbreviation: selectedUnitData[2],
      unit_category_id: selectedUnitData[3]
    });

    console.log(selectedUnit)
    setShowUpdateModal(true);
  };

  const handleUpdateUnit = async (unitData: { status: any; unit_name: string; abbreviation: string }) => {
    const result = await updateUnit(selectedUnit.unit_id, unitData.unit_name, unitData.abbreviation, unitData.status);

    handleCloseModal();
    const updatedUnits = await fetchAllUnits();
    const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.unit_category_name ,unit.status, formatDate(unit.createdAt), formatDate(unit.updatedAt)]);
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
        const formattedUnits = updatedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation, unit.unit_category_name ,unit.status, formatDate(unit.createdAt), formatDate(unit.updatedAt)]);
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
        <Col md={3}><h3 className={'text-primary'}>{UNIT_CATEGORY_PAGE_NAME}</h3></Col>
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
          table_fields={UNIT_CATEGORY_TABLE_FIELDS}
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
          <h3 className='text-primary'>{ADD_UNIT_CATEGORY_PAGE_NAME}</h3>
          <TextInput 
            form_id="unit_category_name"
            onChangeText={(event) => setUnitName(event.target.value)}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={unitName}
          />
          <SelectBox 
            values={UNIT_CATEGORY_TYPES} // Use category IDs as values
            display_values={UNIT_CATEGORY_TYPES} // Use category names as display values
            label_name={UNIT_CATEGORY_TYPE_LABAL}
            form_id="unit_categories"
            onChange={(value) => setSelectedCategory(value)} // Handle category selection
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
          selectedCategory={selectedUnit.unit_category_id}
          
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