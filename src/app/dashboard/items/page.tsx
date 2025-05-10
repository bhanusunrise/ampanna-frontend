'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, ADD_UNIT_CONVERSION, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, FIRST_UNIT_NAME_LABAL, ITEMS_API, ITEMS_PAGE_NAME, ITEMS_SEARCH_PLACEHOLDER, ITEMS_TABLE_FIELDS, MULTIPLIER_LABAL, MULTIPLIER_PLACEHOLDER, NO_RECORDS_FOUND, SEARCH, SECOND_UNIT_NAME_LABAL, UNIT_API, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_TABLE_FIELDS, UNIT_CONVERSION_API, UNIT_CONVERSION_PAGE_NAME, UNIT_CONVERSION_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CONVERSION_MODEL_TITLE } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import NumberInput from '@/app/components/Forms/number_input';
import UnitInterface from '@/app/interfaces/unit_interface';
import DisabledInput from '@/app/components/Forms/disabled_input';
import ItemInterface from '@/app/interfaces/item_interface';

const ItemsPage = () => {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<UnitInterface[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemInterface | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategoryInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isMainUnitIdSelected, setIsMainUnitIdSelected] = useState<boolean>(false);
  const [isOtherUnitIdsSelected, setIsOtherUnitIdsSelected] = useState<boolean>(false);
  const [isOtherParametersSelected, setIsOtherParametersSelected] = useState<boolean>(false);
  const [isMainUnitNameSelected, setIsMainUnitNameSelected] = useState<boolean>(false);
  const [isOtherUnitNameSelected, setIsOtherUnitNameSelected] = useState<boolean>(false);
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

  const fetchItems = async () => {
    try {
      const response = await fetch(`${ITEMS_API}fetch_all_items`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const { success, data } = await response.json();
      if (success && Array.isArray(data)) {
        setItems(data);
        setFilteredItems(data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    }

  const fetchSelectedItem = async (id: string) => {
    try {
      const response = await fetch(`${ITEMS_API}fetch_item?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch item');
      }
      const { success, data } = await response.json();
      if (success && data) {
        setSelectedItem(data);
        console.log('Selected Item:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }

  const callUpdateItemAPI = async (id: string) => {
    try {
      const response = await fetch(`${ITEMS_API}update_item`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         id : selectedItem?._id,
         name : selectedItem?.name,
         description : selectedItem?.description,
         main_unit_id : selectedItem?.main_unit_id,
         other_unit_ids : selectedItem?.other_unit_ids,
         other_parameters : selectedItem?.other_parameters,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update items');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Item:', data);
        setShowUpdateModal(false);
        
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  const addItem = async () => {
    try {
      console.log('Selected Item:', selectedItem);
      const response = await fetch(`${ITEMS_API}create_item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : selectedItem?.name,
          description : selectedItem?.description,
          main_unit_id : selectedItem?.main_unit_id,
          other_unit_ids : selectedItem?.other_unit_ids,
          other_parameters : selectedItem?.other_parameters,
          
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Item:', data);
        
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`${ITEMS_API}delete_item?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      const { success, data } = await response.json();
      fetchItems();

      if (success && data) {
        console.log('Deleted Conversion:', data); // Refresh the items list after deletion
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
        
  useEffect(() => {
    fetchUnitCategories();
    fetchItems();
      
  }, []);

// Handle search functionality
  useEffect(() => {
    const filtered = items.filter(item => {
  const searchLower = searchQuery.toLowerCase();

  return (
    (isIdSelected && item._id.toLowerCase().includes(searchLower)) ||
    (isNameSelected && item.name.toLowerCase().includes(searchLower)) ||
    (isDescriptionSelected && item.description?.toLowerCase().includes(searchLower)) ||
    (isMainUnitIdSelected && item.main_unit_id.toLowerCase().includes(searchLower)) ||
    (isOtherUnitIdsSelected && item.other_unit_ids.some(unitId => unitId.toLowerCase().includes(searchLower))) ||
    (isOtherParametersSelected && item.other_parameters.some(param => 
      param.parameter_name.toLowerCase().includes(searchLower) || 
      param.value.toLowerCase().includes(searchLower)
    )) ||
    (isMainUnitNameSelected && item.main_unit_name?.toLowerCase().includes(searchLower)) ||
    (isOtherUnitNameSelected && item.other_unit_names.some(unitName => unitName.toLowerCase().includes(searchLower))) ||

    // If no checkboxes are selected, search in all fields
    (!isIdSelected && !isNameSelected && !isDescriptionSelected && !isMainUnitIdSelected && !isOtherUnitIdsSelected && 
     !isOtherParametersSelected && !isMainUnitNameSelected && !isOtherUnitNameSelected &&
      (
        item._id.toLowerCase().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.main_unit_id.toLowerCase().includes(searchLower) ||
        item.other_unit_ids.some(unitId => unitId.toLowerCase().includes(searchLower)) ||
        item.other_parameters.some(param => 
          param.parameter_name.toLowerCase().includes(searchLower) || 
          param.value.toLowerCase().includes(searchLower)
        ) ||
        item.main_unit_name?.toLowerCase().includes(searchLower) ||
        item.other_unit_names.some(unitName => unitName.toLowerCase().includes(searchLower))
      )
    )
  );
});

    setFilteredItems(filtered);
  }
, [searchQuery, items, isIdSelected, isNameSelected, isDescriptionSelected, isMainUnitIdSelected, isOtherUnitIdsSelected, isOtherParametersSelected, isMainUnitNameSelected, isOtherUnitNameSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{ITEMS_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={ITEMS_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className="scrollable-table">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {ITEMS_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.barcode}</td>
                  
                  <td id = {item.main_unit_id}> <Badge bg="primary" className='me-1' id = {item.main_unit_id}>{item.main_unit_name}</Badge></td>
                  <td>
                    {item.other_unit_ids.map((unitId, index) => (
                      <span key={index} id={unitId}>
                        <Badge bg="secondary" className='me-1' id = {unitId}>
                          {item.other_unit_names[index]}
                        </Badge>
                        
                      </span>
                    ))}
                    </td>
                  <td>{item.description}</td>
                  <td>
                  {item.other_parameters.map((parameter, index) => (
                    <Badge key={index} bg="warning" className="me-1">
                      {parameter.parameter_name}: {parameter.value}
                    </Badge>
                  ))}</td>                
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedItem(item._id)}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedItemId(item._id)}}>{DELETE_BUTTON_LABAL}</button>
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

        </div>
        </div>

        {showDeleteModal && selectedItemId && (
                
                <Modal show={showDeleteModal}>
                  <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
                    <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedItemId}`}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                      {BACK}
                    </Button>
                    <Button variant="danger" onClick={() => {deleteItem(selectedItemId); setShowDeleteModal(false); }}>
                      {DELETE_BUTTON_DELETE_MODAL}
                    </Button>
                  </Modal.Footer>
                </Modal>)}
        </>    
  );
};

export default ItemsPage;