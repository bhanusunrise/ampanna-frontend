'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, BACK, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NEW_UNIT_TITLE, NO_RECORDS_FOUND, SEARCH, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import Checkbox from '@/app/components/Forms/check_box';
import UpdateModel from '@/app/components/Models/update_model';
import AddButton from '@/app/components/Buttons/add_button';

const UnitCategoryPage = () => {
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<UnitCategoryInterface[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategoryInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUnitCategories = async () => {
      try {
        const response = await fetch(`${UNIT_CATEGORY_API}fetch_all_unit_categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch unit categories');
        }

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setUnitCategories(data);
          setFilteredCategories(data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching unit categories:', error);
      }
    };

  const fetchSelectedCategory = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}fetch_all_unit_categories?_id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch unit category');
      }
      // Since the api returns an array of categories, update the type to UnitCategoryInterface[]
      const { success, data } = await response.json() as {
        success: boolean;
        data: UnitCategoryInterface[];  // Note the array here
      };

      if (success && data && data.length > 0) {
        setSelectedCategory(data[0]);
        console.log('Selected Category:', data[0]);
        setShowUpdateModal(true);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching unit category:', error);
    }
  };

  const callUpdateCategoryAPI = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}update_unit_category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          unit_category_name: selectedCategory?.unit_category_name,
          description: selectedCategory?.description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update unit category');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Category:', data);
        setShowUpdateModal(false);
        fetchUnitCategories();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating unit category:', error);
    }
  }

  const addUnitCategory = async () => {
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}create_unit_category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit_category_name: selectedCategory?.unit_category_name,
          description: selectedCategory?.description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add unit category');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Category:', data);
        fetchUnitCategories();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding unit category:', error);
    }
  }

  const deleteUnitCategory = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}delete_unit_category?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete unit category');
      }
      const { success, data } = await response.json();
      fetchUnitCategories();
      if (success && data) {
        console.log('Deleted Category:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting unit category:', error);
    }
  }
        
  useEffect(() => {
    fetchUnitCategories();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(unitCategories);
    } else {
      const filtered = unitCategories.filter(category => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && category._id.toLowerCase().includes(searchLower)) ||
          (isNameSelected && category.unit_category_name.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && category.description.toLowerCase().includes(searchLower)) ||
          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isNameSelected && !isDescriptionSelected && (
            category._id.toLowerCase().includes(searchLower) ||
            category.unit_category_name.toLowerCase().includes(searchLower) ||
            category.description.toLowerCase().includes(searchLower)
          ))
        );
      });
      setFilteredCategories(filtered);
    }
  }, [searchQuery, unitCategories, isIdSelected, isNameSelected, isDescriptionSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={UNIT_CATEGORIES_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className="scrollable-table">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {UNIT_CATEGORY_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr key={index}>
                  <td>{category._id}</td>
                  <td>{category.unit_category_name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedCategory(category._id)}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedCategoryId(category._id)}}>{DELETE_BUTTON_LABAL}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={UNIT_CATEGORY_TABLE_FIELDS.length} className="text-center">{NO_RECORDS_FOUND}</td>
              </tr>
            )}
          </tbody>
        </Table>
        </div>
        </div>
        <div className='col-md-4'>
          <h3 className='text-primary'>{NEW_UNIT_TITLE}</h3>

          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedCategory({ ...selectedCategory, unit_category_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedCategory?.unit_category_name}
          />

           <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedCategory?.description}
          />

          <Button variant='success' className='mt-3' onClick={addUnitCategory}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {showUpdateModal && selectedCategory && (

      <Modal show={showUpdateModal}>
        <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
          <Modal.Title className='text-primary'>{UPDATE_UNIT_CATEGORY_MODEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedCategory({ ...selectedCategory, unit_category_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedCategory.unit_category_name}
          />
          <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedCategory.description}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            {BACK}
          </Button>
          <Button variant="primary" onClick={() => {console.log(selectedCategory._id); callUpdateCategoryAPI(selectedCategory._id); setShowUpdateModal(false); }}>
            {UPDATE}
          </Button>
        </Modal.Footer>
      </Modal>
      )}

      {showDeleteModal && selectedCategoryId && (
        
        <Modal show={showDeleteModal}>
          <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
            <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedCategoryId}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {BACK}
            </Button>
            <Button variant="danger" onClick={() => {deleteUnitCategory(selectedCategoryId); setShowDeleteModal(false); }}>
              {DELETE_BUTTON_LABAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UnitCategoryPage;