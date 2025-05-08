'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NEW_UNIT_TITLE, NO_RECORDS_FOUND, SEARCH, UNIT_API, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_TABLE_FIELDS, UNIT_NAME_LABAL, UNIT_NAME_PLACEHOLDER, UNIT_PAGE_NAME, UNIT_TABLE_FIELDS, UNITS_SEARCH_PLACEHOLDER, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import { Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import UnitInterface from '@/app/interfaces/unit_interface';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';

const UnitCategoryPage = () => {
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<UnitInterface[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);

  const fetchUnits = async () => {
      try {
        const response = await fetch(`${UNIT_API}fetch_all_units`);
        if (!response.ok) {
          throw new Error('Failed to fetch units');
        }

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setUnits(data);
          setFilteredUnits(data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    const fetchUnitCategories = async () => {
          try {
            const response = await fetch(`${UNIT_CATEGORY_API}fetch_all_unit_categories`);
            if (!response.ok) {
              throw new Error('Failed to fetch unit categories');
            }
    
            const { success, data } = await response.json();
            if (success && Array.isArray(data)) {
              setUnitCategories(data);
            } else {
              throw new Error('Invalid API response format');
            }
          } catch (error) {
            console.error('Error fetching unit categories:', error);
          }
        };
    

  const fetchSelectedUnit = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_API}fetch_all_units?_id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch unit category');
      }
      // Since the api returns an array of categories, update the type to UnitCategoryInterface[]
      const { success, data } = await response.json() as {
        success: boolean;
        data: UnitInterface[];  // Note the array here
      };

      if (success && data && data.length > 0) {
        setSelectedUnit(data[0]);
        console.log('Selected Unit:', data[0]);
        setShowUpdateModal(true);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching unit category:', error);
    }
  };

  const callUpdateUnitAPI = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_API}update_unit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          unit_name: selectedUnit?.unit_name,
          description: selectedUnit?.description,
          unit_category_id: selectedUnit?.unit_category_id,
      
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update unit');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Unit:', data);
        setShowUpdateModal(false);
        fetchUnits();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating unit category:', error);
    }
  }

  const addUnit = async () => {
    try {
      const response = await fetch(`${UNIT_API}create_unit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit_name: selectedUnit?.unit_name,
          description: selectedUnit?.description,
          unit_category_id: selectedUnit?.unit_category_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add unit');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Unit:', data);
        fetchUnits();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  }

  const deleteUnit = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_API}delete_unit?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete unit');
      }
      const { success, data } = await response.json();
      fetchUnits();
      if (success && data) {
        console.log('Deleted Unit:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  }
        
  useEffect(() => {
    fetchUnits();
    fetchUnitCategories();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUnits(units);
    } else {
      const filtered = units.filter(unit => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && unit._id.toLowerCase().includes(searchLower)) ||
          (isNameSelected && unit.unit_name.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && unit.description.toLowerCase().includes(searchLower)) ||
          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isNameSelected && !isDescriptionSelected && (
            unit._id.toLowerCase().includes(searchLower) ||
            unit.unit_name.toLowerCase().includes(searchLower) ||
            unit.description.toLowerCase().includes(searchLower)
          ))
        );
      });
      setFilteredUnits(filtered);
    }
  }, [searchQuery, units, isIdSelected, isNameSelected, isDescriptionSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{UNIT_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={UNITS_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className="scrollable-table">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {UNIT_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit, index) => (
                <tr key={index}>
                  <td>{unit._id}</td>
                  <td>{unit.unit_name}</td>
                  <td id = {unit.unit_category_id}>{unit.unit_category_name}</td>
                  <td>{unit.description}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedUnit(unit._id)}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedUnitId(unit._id)}}>{DELETE_BUTTON_LABAL}</button>
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
            form_id="unit_name"
            onChangeText={(e) => setSelectedUnit({ ...selectedUnit, unit_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_NAME_PLACEHOLDER}
            label={UNIT_NAME_LABAL}
            value={selectedUnit?.unit_name}
          />

          <label className="form-label mt-2 text-primary">{UNIT_CATEGORY_NAME_LABAL}</label>

          <select className="form-select mb-2" onChange={(e) => setSelectedUnit({ ...selectedUnit, unit_category_id: e.target.value })}>
           
            {unitCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.unit_category_name}
              </option>
            ))}
          </select>

           <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedUnit({ ...selectedUnit, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedUnit?.description}
          />

          <Button variant='success' className='mt-3' onClick={addUnit}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {showUpdateModal && selectedUnit && (

      <Modal show={showUpdateModal}>
        <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
          <Modal.Title className='text-primary'>{UPDATE_UNIT_CATEGORY_MODEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedUnit({ ...selectedUnit, unit_name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedUnit.unit_name}
          />

          <label className="form-label mt-2 text-primary">{UNIT_CATEGORY_NAME_LABAL}</label>

          <select className="form-select mb-2" onChange={(e) => setSelectedUnit({ ...selectedUnit, unit_category_id: e.target.value })} value={selectedUnit.unit_category_id}>
            
            {unitCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.unit_category_name}
              </option>
            ))}
          </select>
          <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedUnit({ ...selectedUnit, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedUnit.description}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            {BACK}
          </Button>
          <Button variant="primary" onClick={() => {console.log(selectedUnit._id); callUpdateUnitAPI(selectedUnit._id); setShowUpdateModal(false); }}>
            {UPDATE}
          </Button>
        </Modal.Footer>
      </Modal>
      )}

      {showDeleteModal && selectedUnitId && (
        
        <Modal show={showDeleteModal}>
          <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
            <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedUnitId}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {BACK}
            </Button>
            <Button variant="danger" onClick={() => {deleteUnit(selectedUnitId); setShowDeleteModal(false); }}>
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UnitCategoryPage;