'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, ADD_UNIT_CONVERSION, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, FIRST_UNIT_NAME_LABAL, MULTIPLIER_LABAL, MULTIPLIER_PLACEHOLDER, NEW_UNIT_TITLE, NO_RECORDS_FOUND, SEARCH, SECOND_UNIT_NAME_LABAL, UNIT_API, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UNIT_CONVERSION_API, UNIT_CONVERSION_PAGE_NAME, UNIT_CONVERSION_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import UnitConversionInterface from '@/app/interfaces/unit_conversion_interface';
import NumberInput from '@/app/components/Forms/number_input';
import UnitInterface from '@/app/interfaces/unit_interface';

const UnitConversionPage = () => {
  const [unitConversions, setUnitConversions] = useState<UnitConversionInterface[]>([]);
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);
  const [filteredConversions, setFilteredConversions] = useState<UnitConversionInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<UnitInterface[]>([]);
  const [selectedConversionId, setSelectedConversionId] = useState<string | null>(null);
  const [selectedConversion, setSelectedConversion] = useState<UnitConversionInterface | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategoryInterface | null>(null);
  const [selectedFirstUnit, setSelectedFirstUnit] = useState<UnitInterface | null>(null);
  const [selectedSecondUnit, setSelectedSecondUnit] = useState<UnitInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isMultiplierSelected, setIsMultiplierSelected] = useState<boolean>(false);
  const [isFirstUnitIdSelected, setIsFirstUnitIdSelected] = useState<boolean>(false);
  const [isFirstUnitNameSelected, setIsFirstUnitNameSelected] = useState<boolean>(false);
  const [isSecondUnitIdSelected, setIsSecondUnitIdSelected] = useState<boolean>(false);
  const [isSecondUnitNameSelected, setIsSecondUnitNameSelected] = useState<boolean>(false);
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
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching unit categories:', error);
      }
    };

  const fetchUnitConversions = async () => {
      try {
        const response = await fetch(`${UNIT_CONVERSION_API}fetch_all_unit_conversions`);
        if (!response.ok) {
          throw new Error('Failed to fetch unit conversions');
        }

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setUnitConversions(data);
          setFilteredConversions(data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching unit conversions:', error);
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

  const fetchUnitsForSelectedCategory = async (unit_category_id: string) => {
    try {
      const response = await fetch(`${UNIT_API}fetch_all_units?unit_category_id=${unit_category_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch unit');
      }
      // Since the api returns an array of categories, update the type to UnitCategoryInterface[]
      const { success, data } = await response.json() as {
        success: boolean;
        data: UnitInterface[];  // Note the array here
      };

      if (success && data && data.length > 0) {
        setFilteredUnits(data);
        console.log('Selected Units:', data);
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

  const addUnitConversion = async () => {
    try {
      console.log('Selected Conversion:', selectedConversion);
      const response = await fetch(`${UNIT_CONVERSION_API}create_unit_conversion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_unit_id: selectedConversion?.first_unit_id,
          second_unit_id: selectedConversion?.second_unit_id,
          multiplier: selectedConversion?.multiplier,
          description: selectedConversion?.description,
          
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add unit conversion');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Conversion:', data);
        fetchUnitCategories();
        fetchUnitConversions();
        setSelectedConversion({ first_unit_id: '', second_unit_id: '', multiplier: 0, description: '', first_unit_name: '', second_unit_name: '' });
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding unit conversion:', error);
    }
  }

  const deleteUnitConversion = async (id: string) => {
    try {
      const response = await fetch(`${UNIT_CONVERSION_API}delete_unit_conversion?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete unit conversion');
      }
      const { success, data } = await response.json();
      fetchUnitCategories();
      fetchUnitConversions();
      if (success && data) {
        console.log('Deleted Conversion:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting unit conversion:', error);
    }
  }
        
  useEffect(() => {
    fetchUnitCategories();
    fetchUnitConversions();
    fetchUnitsForSelectedCategory(selectedCategory?._id || '');
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConversions(unitConversions);
    } else {
      const filtered = unitConversions.filter(conversion => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && conversion._id.toLowerCase().includes(searchLower)) ||
          (isMultiplierSelected && conversion.description.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && conversion.description.toLowerCase().includes(searchLower)) ||
          (isFirstUnitNameSelected && conversion.first_unit_name.toLowerCase().includes(searchLower)) ||
          (isSecondUnitNameSelected && conversion.second_unit_name.toLowerCase().includes(searchLower)) ||
          (isFirstUnitIdSelected && conversion.first_unit_id.toLowerCase().includes(searchLower)) ||
          (isSecondUnitIdSelected && conversion.second_unit_id.toLowerCase().includes(searchLower)) ||
          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isMultiplierSelected && !isDescriptionSelected && !isFirstUnitNameSelected && !isSecondUnitNameSelected && !isFirstUnitIdSelected && !isSecondUnitIdSelected && (
            conversion._id.toLowerCase().includes(searchLower) ||
            conversion.multiplier.toString().toLowerCase().includes(searchLower) ||
            conversion.description.toLowerCase().includes(searchLower) ||
            conversion.first_unit_name.toLowerCase().includes(searchLower) ||
            conversion.second_unit_name.toLowerCase().includes(searchLower) ||
            conversion.first_unit_id.toLowerCase().includes(searchLower) ||
            conversion.second_unit_id.toLowerCase().includes(searchLower)
          ))
        );
      });
      setFilteredConversions(filtered);
    }
  }, [searchQuery, unitConversions, isIdSelected, isMultiplierSelected, isDescriptionSelected, isFirstUnitNameSelected, isSecondUnitNameSelected, isFirstUnitIdSelected, isSecondUnitIdSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{UNIT_CONVERSION_PAGE_NAME}</h3>
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
              {UNIT_CONVERSION_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredConversions.length > 0 ? (
              filteredConversions.map((conversion, index) => (
                <tr key={index}>
                  <td>{conversion._id}</td>
                  <td>{conversion.description}</td>
                  <td id = {conversion.first_unit_id}>{conversion.first_unit_name}</td>
                  <td>{conversion.multiplier}</td>
                  <td id = {conversion.second_unit_id}>{conversion.second_unit_name}</td>                
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedCategory(conversion._id)}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedConversionId(conversion._id)}}>{DELETE_BUTTON_LABAL}</button>
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
          <h3 className='text-primary'>{ADD_UNIT_CONVERSION}</h3>

          <label className="form-label">{UNIT_CATEGORY_NAME_LABAL}</label>

          <select className="form-select mb-2" onChange={(e) => {setSelectedCategory({ ...selectedCategory, _id: e.target.value }); fetchUnitsForSelectedCategory(e.target.value)}} value={selectedCategory?._id}>
            
            {unitCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.unit_category_name}
              </option>
            ))}
          </select>

          <TextInput 
            form_id="unit_category_name" 
            onChangeText={(e) => setSelectedConversion({ ...selectedConversion, description: e.target.value })} 
            form_message="" 
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER} 
            label={UNIT_CATEGORY_DESCRIPTION_LABAL} 
            value={selectedConversion?.description}
          />

          <label className="form-label">{FIRST_UNIT_NAME_LABAL}</label>

          <select className="form-select mb-2" onChange={(e) => setSelectedConversion(selectedConversion ? { ...selectedConversion, first_unit_id: e.target.value } : { first_unit_id: e.target.value, second_unit_id: '', multiplier: 0, description: '', first_unit_name: '', second_unit_name: '' })} value={selectedConversion?.first_unit_id}>
            
            {filteredUnits.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.unit_name}
              </option>
            ))}
          </select>

          <label className="form-label">{SECOND_UNIT_NAME_LABAL}</label>

          <select className="form-select mb-2" onChange={(e) => setSelectedConversion(selectedConversion ? { ...selectedConversion, second_unit_id: e.target.value } : null)} value={selectedConversion?.second_unit_id}>
            
            {filteredUnits.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.unit_name}
              </option>
            ))}            
          </select>


          

          <NumberInput
            form_id="multiplier"
            onChangeText={(e) => setSelectedConversion({ ...selectedConversion, multiplier: e.target.value })}
            form_message=""
            placeholder_text={MULTIPLIER_PLACEHOLDER}
            label={MULTIPLIER_LABAL}
            value={selectedConversion?.multiplier} min_value={0} max_value={999999}          />

          <Button variant='success' className='mt-3' onClick={addUnitConversion}>
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

      {showDeleteModal && selectedConversionId && (
        
        <Modal show={showDeleteModal}>
          <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
            <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedConversionId}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {BACK}
            </Button>
            <Button variant="danger" onClick={() => {deleteUnitConversion(selectedConversionId); setShowDeleteModal(false); }}>
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UnitConversionPage;