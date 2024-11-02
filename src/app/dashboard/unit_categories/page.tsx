'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { ADD_BUTTON_LABAL, ADD_UNIT_CATEGORY_PAGE_NAME, CLEAR_BUTTON_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnitCategories, addUnitCategory, updateUnitCategory,/* deleteUnitCategory, restoreUnitCategory*/ } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import UpdateUnitCategoryModal from '@/app/components/Models/Unit_Categories/update_unit_cetegory_model';
import DeleteModal from '@/app/components/Models/delete_model';
import RestoreModal from '@/app/components/Models/restore_model';

export default function Page() {
  const [unitCategories, setUnitCategories] = useState<string[][]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitCategoryName, setUnitCategoryName] = useState('');
  const [unitCategoryType, setUnitCategoryType] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const recordsPerPage = 10;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    async function fetchData() {
      const fetchedCategories = await fetchAllUnitCategories();
      const formattedCategories = fetchedCategories.map((category: any) => [
        category.unit_category_id,
        category.unit_category_name,
        category.default_status,
        category.status,
        formatDate(category.createdAt),
        formatDate(category.updatedAt)
      ]);
      setUnitCategories(formattedCategories);
      setFilteredCategories(formattedCategories);
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredCategories.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = filteredCategories.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);
  const totalPages = Math.ceil(filteredCategories.length / recordsPerPage);
  const startingIndex = currentPage * recordsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = unitCategories.filter(
      (category) => category[1].toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
    setCurrentPage(0);
  };

  const handleAddCategory = async () => {
    if (!unitCategoryName || !unitCategoryType) {
      console.log("Please fill in all fields");
      return;
    }

    const result = await addUnitCategory(unitCategoryName, unitCategoryType);
    if (result.success) {
      const updatedCategories = await fetchAllUnitCategories();
      setUnitCategories(updatedCategories.map((category: any) => [
        category.unit_category_id,
        category.unit_category_name,
        category.default_status,
        category.status,
        formatDate(category.createdAt),
        formatDate(category.updatedAt)
      ]));
      setFilteredCategories(updatedCategories);

      setUnitCategoryName('');
      setUnitCategoryType('');
    }
  };

  const handleUpdate = (rowIndex: number) => {
    const selectedCategoryData = filteredCategories[rowIndex];
    setSelectedCategory({
      unit_category_id: selectedCategoryData[0],
      unit_category_name: selectedCategoryData[1],
      default_status: selectedCategoryData[2],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateCategory = async (updatedCategory: { unit_category_name: string; default_status: string }) => {
    const result = await updateUnitCategory(selectedCategory.unit_category_id, updatedCategory.unit_category_name, updatedCategory.default_status);
    if (result.success) {
      const updatedCategories = await fetchAllUnitCategories();
      setUnitCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      handleCloseUpdateModal();
    }
  };

  const handleDelete = (rowIndex: number) => {
    const categoryToDelete = filteredCategories[rowIndex];
    setItemToDelete({
      unit_category_id: categoryToDelete[0],
      unit_category_name: categoryToDelete[1],
    });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteUnitCategory(itemToDelete.unit_category_id);
      if (result.success) {
        const updatedCategories = await fetchAllUnitCategories();
        setUnitCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
        handleCloseDeleteModal();
      }
    }
  };

  const handleRestore = (rowIndex: number) => {
    const categoryToRestore = filteredCategories[rowIndex];
    setItemToDelete({
      unit_category_id: categoryToRestore[0],
      unit_category_name: categoryToRestore[1],
    });
    setShowRestoreModal(true);
  };

  const confirmRestore = async () => {
    if (itemToDelete) {
      const result = await restoreUnitCategory(itemToDelete.unit_category_id);
      if (result.success) {
        const updatedCategories = await fetchAllUnitCategories();
        setUnitCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
        handleCloseRestoreModal();
      }
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCategory(null);
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
        <Col md={3}><h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3></Col>
        <Col md={6}>
          <TextInput
            form_id="search_category"
            onChangeText={handleSearch}
            form_message=""
            placeholder_text="Search"
            label=""
            value={searchQuery}
          />
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable
            table_fields={UNIT_CATEGORY_TABLE_FIELDS}
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
          <h3 className='text-primary'>{ADD_UNIT_CATEGORY_PAGE_NAME}</h3>
          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setUnitCategoryName(e.target.value)}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label="Category Name"
            value={unitCategoryName}
          />
          <TextInput
            form_id="unit_category_type"
            onChangeText={(e) => setUnitCategoryType(e.target.value)}
            form_message=""
            placeholder_text="Enter Type"
            label="Category Type"
            value={unitCategoryType}
          />
          <ClearButton label={CLEAR_BUTTON_LABAL} onClickButton={() => { setUnitCategoryName(''); setUnitCategoryType(''); }} btn_id="clear_category" />
          <AddButton label={ADD_BUTTON_LABAL} onClickButton={handleAddCategory} btn_id="add_category" />
        </Col>
      </Row>

      {selectedCategory && (
        <UpdateUnitCategoryModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          handleUpdateCategory={handleUpdateCategory}
          categoryName={selectedCategory.unit_category_name}
          defaultStatus={selectedCategory.default_status}
        />
      )}

      {itemToDelete && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={confirmDelete}
          itemName={itemToDelete.unit_category_name}
        />
      )}

      {itemToDelete && (
        <RestoreModal
          show={showRestoreModal}
          handleClose={handleCloseRestoreModal}
          handleRestore={confirmRestore}
          itemName={itemToDelete.unit_category_name}
        />
      )}
    </>
  );
}
