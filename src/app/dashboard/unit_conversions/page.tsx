'use client';

import SelectBox from "@/app/components/Forms/select_box";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { addUnitConversion, deleteUnitConversion, fetchAllUnitCategories, fetchAllUnitConversions, fetchAllUnits, restoreUnitConversion, updateUnitConversion } from './functions'; // Assuming it's in the same directory
import NumberInput from "@/app/components/Forms/number_input";
import { ADD_BUTTON_LABAL, ADD_UNIT_CONVERSION, CLEAR_BUTTON_LABAL, FIRST_UNIT_NAME_LABAL, MULTIPLIER_LABAL, MULTIPLIER_PLACEHOLDER, SECOND_UNIT_NAME_LABAL, UNIT_CATEGORY_NAME_LABAL, UNIT_CONVERSION_PAGE_NAME, UNIT_CONVERSION_TABLE_FIELDS } from "@/app/constants/constants";
import ClearButton from "@/app/components/Buttons/clear_button";
import AddButton from "@/app/components/Buttons/add_button";
import BasicTable from "@/app/components/Tables/basic_table";
import NavigateButtons from "@/app/components/Buttons/navigate_button";
import UpdateUnitConversionModal from "@/app/components/Models/Unit_Conversions/update_unit_conversion_model";
import DeleteModal from "@/app/components/Models/delete_model";
import RestoreModal from "@/app/components/Models/restore_model";
import TextInput from "@/app/components/Forms/text_input";

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
  const [unitConversions, setUnitConversions] = useState<string[][]>([]);
  const [filteredConversions, setFilteredConversions] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversion, setSelectedConversion] = useState<any>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);



  const recordsPerPage = 10;

    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const reloadData = async () => {
    const fetchedConversions = await fetchAllUnitConversions();
    const formattedConversions = fetchedConversions.map((conversion: any) => [
      conversion.conversion_id,
      conversion.from_unit_name,
      conversion.value,
      conversion.to_unit_name,
      conversion.status,
      formatDate(conversion.createdAt),
      formatDate(conversion.updatedAt),
    ]);
    setUnitConversions(formattedConversions);
    setFilteredConversions(formattedConversions);
    console.log(formattedConversions);
  };

  useEffect(() => {
    reloadData();
  }, []);

    const handleNext = () => {
    if (currentPage < Math.ceil(filteredConversions.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

    const currentRecords = filteredConversions.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );
  const totalPages = Math.ceil(filteredConversions.length / recordsPerPage);
  const startingIndex = currentPage * recordsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
     const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = unitConversions.filter((conversion) =>
      conversion[1].toLowerCase().includes(query) || conversion[3].toLowerCase().includes(query)
    );
    setFilteredConversions(filtered);
    setCurrentPage(0);
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

    /*
    const payload = {
        unitFrom: selectedFirstUnitID,
        unitTo: selectedSecondUnitID,
        value: multiplier
    };*/
    
   // console.log('Payload to send:', payload); // Add this line

    const result = await addUnitConversion(selectedFirstUnitID, selectedSecondUnitID, multiplier);
    if (result.success) {
        // Reload or reset the state as necessary
        await reloadData();
        setSelectedFirstUnitID('');
        setSelectedSecondUnitID('');
        setMultiplier(0);
    } else {
        console.error(result.message); // Log error message
    }
 };

   const handleUpdate = (rowIndex: number) => {
    const selectedConversionData = filteredConversions[rowIndex];
    setSelectedConversion({
      unit_category_conversion_id: selectedConversionData[0],
      first_unitname: selectedConversionData[1],
      multiplier: selectedConversionData[2],
      second_unitname: selectedConversionData[3],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateConversion = async (updatedConversion: { multiplier: number }) => {
  // Pass the correct ID key for the selected conversion
  const result = await updateUnitConversion(
    selectedConversion.unit_category_conversion_id,
    updatedConversion.multiplier
  );

  if (result.success) {
    await reloadData();
    handleCloseUpdateModal();
  } else {
    console.error(result.message); // Log error message for debugging
  }
};


    const handleDelete = (rowIndex: number) => {
    const conversionToDelete = filteredConversions[rowIndex];
    setItemToDelete({
      unit_category_id: conversionToDelete[0],
      unit_category_name: conversionToDelete[1],
    });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteUnitConversion(itemToDelete.unit_category_id);
      if (result.success) {
        await reloadData();
        handleCloseDeleteModal();
      }
    }
  };

   const handleRestore = (rowIndex: number) => {
    const conversionToRestore = filteredConversions[rowIndex];
    setItemToDelete({
      unit_conversion_id: conversionToRestore[0],
      unit_conversion_name: conversionToRestore[1],
    });
    setShowRestoreModal(true);
  };

  const confirmRestore = async () => {
    if (itemToDelete) {
      const result = await restoreUnitConversion(itemToDelete.unit_conversion_id);
      if (result.success) {
        await reloadData();
        handleCloseRestoreModal();
      }
    }
  };

    const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedConversion(null);
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
        <Col md={4}><h3 className={'text-primary'}>{UNIT_CONVERSION_PAGE_NAME}</h3></Col>
        <Col md={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'nowrap' }}>
          <TextInput
            form_id="search_category"
            onChangeText={handleSearch}
            form_message=""
            placeholder_text="Search"
            label=""
            value={searchQuery}
          />
        </Col>
        <br/>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable
            table_fields={UNIT_CONVERSION_TABLE_FIELDS}
            table_records={currentRecords}
            table_id="unit_categories_table"
            startingIndex={startingIndex}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />
          <NavigateButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        
        </Col>
        <Col md={3}>
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
      {selectedConversion && (
        <UpdateUnitConversionModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          handleUpdateUnitConversion={handleUpdateConversion}
          firstUnit={selectedConversion.first_unitname}
          initialMultiplier={selectedConversion.multiplier}
          secondUnit={selectedConversion.second_unitname}
        />
      )}
      {itemToDelete && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={confirmDelete}
          itemName={itemToDelete.unit_conversion_name}
        />
      )}

      {itemToDelete && (
        <RestoreModal
          show={showRestoreModal}
          handleClose={handleCloseRestoreModal}
          handleRestore={confirmRestore}
          itemName={itemToDelete.unit_conversion_name}
        />
      )}
    </>
  );
}
