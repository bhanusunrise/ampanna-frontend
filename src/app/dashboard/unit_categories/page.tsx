'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NEW_UNIT_CATEGORY_TITLE, NO_RECORDS_FOUND, SEARCH, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import Checkbox from '@/app/components/Forms/check_box';

const UnitCategoryPage = () => {
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);                                // State to hold the fetched unit categories
  const [filteredCategories, setFilteredCategories] = useState<UnitCategoryInterface[]>([]);                        // State to hold the filtered unit categories
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);                                // State to hold the selected category ID for deletion
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState<UnitCategoryInterface | null>(null);         // State to hold the selected category for addition
  const [selectedCategoryForUpdate, setSelectedCategoryForUpdate] = useState<UnitCategoryInterface | null>(null);   // State to hold the selected category for update
  const [searchQuery, setSearchQuery] = useState<string>('');                                                       // State to hold the search query
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);                                                 // State to hold the checkbox state for ID
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);                               // State to hold the checkbox state for description
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);                                             // State to hold the checkbox state for name
  const [showUpdateModal, setShowUpdateModal] = useState(false);                                                    // State to control the update modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);                                                    // State to control the delete modal

  const fetchUnitCategories = async () => {                                                          // Function to fetch unit categories from the API and update the state
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

  const callUpdateCategoryAPI = async () => {                                                         // Function to call the update category API  
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}update_unit_category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedCategoryForUpdate?._id,
          unit_category_name: selectedCategoryForUpdate?.unit_category_name,
          description: selectedCategoryForUpdate?.description,
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

  const addUnitCategory = async () => {                                                               // Function to call the add category API
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}create_unit_category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit_category_name: selectedCategoryForAdd?.unit_category_name,
          description: selectedCategoryForAdd?.description,
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

  const deleteUnitCategory = async (id: string) => {                                                  // Function to call the delete category API
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
    fetchUnitCategories();                                                  // Fetch unit categories when the component mounts
  }, []);

  
  useEffect(() => {
    if (searchQuery.trim() === '') {                                    // Filter categories based on the search query    
      setFilteredCategories(unitCategories);
    } else {
      const filtered = unitCategories.filter(category => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && category._id.toLowerCase().includes(searchLower)) ||
          (isNameSelected && category.unit_category_name.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && category.description.toLowerCase().includes(searchLower)) ||
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
        <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>    {/* Page Name */}  
        
        {/* Search Input */}
        <TextInput                                                      
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={UNIT_CATEGORIES_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
       
        <br />
        <div className='d-flex'>
          {/* Checkboxes for filtering */}
        <Checkbox                                                        
          label={UNIT_CATEGORY_TABLE_FIELDS[0]}
          checked={isIdSelected}
          onChange={() => setIsIdSelected(!isIdSelected)}
          form_id="id_checkbox"
          form_message=""
          className='me-4 text-primary'
        />
        <Checkbox                                                                                   
          label={UNIT_CATEGORY_TABLE_FIELDS[1]}
          checked={isNameSelected}
          onChange={() => setIsNameSelected(!isNameSelected)}
          form_id="name_checkbox"
          form_message=""
          className='me-4 text-primary'
        />
        <Checkbox                                                                           
          label={UNIT_CATEGORY_TABLE_FIELDS[2]}
          checked={isDescriptionSelected}
          onChange={() => setIsDescriptionSelected(!isDescriptionSelected)}
          form_id="description_checkbox"
          form_message=""
          className='me-4 text-primary'
        />
        </div>

        <div className="scrollable-table">
        {/* Table to display unit categories */}
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
                    <div className='d-flex flex-column flex-sm-row gap-2'>
                    <button className="btn btn-primary btn-sm" onClick={() => {setSelectedCategoryForUpdate(category); setShowUpdateModal(true); }}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm" onClick={() => {setShowDeleteModal(true); setSelectedCategoryId(category._id)}}>{DELETE_BUTTON_LABAL}</button>
                    </div>
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
          <h3 className='text-primary'>{NEW_UNIT_CATEGORY_TITLE}</h3>     {/* New Unit Category Title */} 
          {/* Form to add a new unit category */}
          <TextInput                                                               
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedCategoryForAdd({ ...selectedCategoryForAdd, unit_category_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedCategoryForAdd?.unit_category_name}
          />

           <TextInput                                                         
            form_id="description"
            onChangeText={(e) => setSelectedCategoryForAdd({ ...selectedCategoryForAdd, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedCategoryForAdd?.description}
          />

          <Button variant='success' className='mt-3' onClick={addUnitCategory}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedCategoryForUpdate && (


      <Modal show={showUpdateModal}>
        <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
          <Modal.Title className='text-primary'>{UPDATE_UNIT_CATEGORY_MODEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedCategoryForUpdate({ ...selectedCategoryForUpdate, unit_category_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedCategoryForUpdate?.unit_category_name}
          />
          <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedCategoryForUpdate({ ...selectedCategoryForUpdate, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedCategoryForUpdate?.description}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            {BACK}
          </Button>
          <Button variant="primary" onClick={() => {console.log(selectedCategoryForUpdate?._id); callUpdateCategoryAPI(); setShowUpdateModal(false); }}>
            {UPDATE}
          </Button>
        </Modal.Footer>
      </Modal>
      )}

      {/* Delete Modal */}

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
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UnitCategoryPage;