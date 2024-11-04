'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import {
  ADD_BUTTON_LABAL,
  ADD_ITEM_CATEGORY,
  ADD_UNIT_CATEGORY_PAGE_NAME,
  CLEAR_BUTTON_LABAL,
  ITEM_CATEGORIES_PAGE_NAME,
  ITEM_CATEGORIES_TABLE_FIELDS,
  ITEM_CATEGORY_NAME_LABAL,
  ITEM_CATEGORY_NAME_PLACEHOLDER,
} from '@/app/constants/constants';
import {
  deleteItemCategory,
  insertItemCategory,
  loadAllItemCategories,
  updateItemCategory,
} from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import UpdateItemCategoryModal from '@/app/components/Models/Item_Categories/update_item_cetegory_model';
import DeleteModal from '@/app/components/Models/delete_model';

export default function Page() {
  const [itemCategories, setItemCategories] = useState<string[][]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemCategoryName, setItemCategoryName] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);

  const recordsPerPage = 10;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const reloadData = async () => {
    const fetchedCategories = await loadAllItemCategories();
    const formattedCategories = fetchedCategories.map((category: any) => [
      category.category_id,
      category.category_name,
      category.status,
      formatDate(category.createdAt),
      formatDate(category.updatedAt),
    ]);
    setItemCategories(formattedCategories);
    setFilteredCategories(formattedCategories);
  };

  useEffect(() => {
    reloadData();
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

  const currentRecords = filteredCategories.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );
  const totalPages = Math.ceil(filteredCategories.length / recordsPerPage);
  const startingIndex = currentPage * recordsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = itemCategories.filter((category) =>
      category[1].toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
    setCurrentPage(0);
  };

  const handleAddCategory = async () => {
    if (!itemCategoryName) {
      console.log('Please fill in all fields');
      return;
    }

    const result = await insertItemCategory(itemCategoryName);
    if (result.success) {
      await reloadData();
      setItemCategoryName('');
    }
  };

  const handleUpdate = (rowIndex: number) => {
    const selectedCategoryData = filteredCategories[rowIndex];
    setSelectedCategory({
      category_id: selectedCategoryData[0],
      category_name: selectedCategoryData[1],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateCategory = async (updatedCategory: {
    category_name: string;
  }) => {
    if (selectedCategory) {
      const result = await updateItemCategory(
        selectedCategory.category_id,
        updatedCategory.category_name,
      );
      if (result.success) {
        handleCloseUpdateModal();
        await reloadData();
      }
    }
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
        const result = await deleteItemCategory(categoryToDelete.item_category_id);
        if (result.success) {
            await reloadData(); // Refresh the data after deletion
            handleCloseDeleteModal(); // Close the delete modal
        }
    }
};
  const handleDeleteCategory = (rowIndex: number) => {
    const selectedCategoryData = filteredCategories[rowIndex];
    setCategoryToDelete({
        item_category_id: selectedCategoryData[0],
        item_category_name: selectedCategoryData[1],
    });
    setShowDeleteModal(true);
};


const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
};


  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCategory(null);
  };

return (
    <>
        <Row>
            <Col md={3}>
                <h3 className="text-primary">{ITEM_CATEGORIES_PAGE_NAME}</h3>
            </Col>
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
        </Row>
        <Row>
            <Col md={9}>
                <BasicTable
                    table_fields={ITEM_CATEGORIES_TABLE_FIELDS}
                    table_records={currentRecords}
                    table_id="unit_categories_table"
                    startingIndex={startingIndex}
                    onUpdate={handleUpdate}
                    onDelete={handleDeleteCategory} // Assuming your BasicTable supports onDelete prop
                />
                <NavigateButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            </Col>
            <Col md={3}>
                <h3 className="text-primary">{ADD_ITEM_CATEGORY}</h3>
                <TextInput
                    form_id="item_category_name"
                    onChangeText={(e) => setItemCategoryName(e.target.value)}
                    form_message=""
                    placeholder_text={ITEM_CATEGORY_NAME_PLACEHOLDER}
                    label={ITEM_CATEGORY_NAME_LABAL}
                    value={itemCategoryName}
                />
                <br />
                <ClearButton
                    label={CLEAR_BUTTON_LABAL}
                    onClickButton={() => {
                        setItemCategoryName('');
                    }}
                    btn_id="clear_category"
                />
                <AddButton label={ADD_BUTTON_LABAL} onClickButton={handleAddCategory} btn_id="add_category" />
            </Col>
        </Row>
        {selectedCategory && 
            <UpdateItemCategoryModal
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                handleUpdateItemCategory={handleUpdateCategory}
                item_category_name={selectedCategory.category_name}
            />
        } 
        {categoryToDelete && 
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
                itemName={categoryToDelete.item_category_name}
            />
        }
    </>
);

}
