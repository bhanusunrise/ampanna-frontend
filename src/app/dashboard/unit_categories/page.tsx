'use client';

import React, { useEffect, useState } from 'react';
import { NO_RECORDS_FOUND, SEARCH, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import Checkbox from '@/app/components/Forms/check_box';
import UpdateModel from '@/app/components/Models/update_model';

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
      console.log('Selected Category:', selectedCategory);
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            unit_category_id: id,
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
        
  useEffect(() => {
    fetchUnitCategories();
  }, []);

  return (
    <>
      <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>
      <TextInput label={SEARCH} onChange={(e) => setSearchQuery(e.target.value)} form_id="search" form_message="" placeholder_text={UNIT_CATEGORIES_SEARCH_PLACEHOLDER} value={searchQuery}/>
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
                  <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedCategory(category._id)}>Edit</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => fetchSelectedCategory(category._id)}>Delete</button>
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

      { showUpdateModal && (<UpdateModel 
        modelName={"Update Unit Category"}
        textInputs={[
          {
            label: 'Unit Category Name',
            placeholder: 'Enter unit category name',
            value: selectedCategory?.unit_category_name || '',
            onChange: (e) => setSelectedCategory(prev => ({ ...prev!, unit_category_name: e.target.value })),
            required: true,
          },
          {
            label: 'Description',
            placeholder: 'Enter description',
            value: selectedCategory?.description || '',
            onChange: (e) => setSelectedCategory(prev => ({ ...prev!, unit_category_name: e.target.value })),
            required: true,
          },
        ]}
        numberInputs={[]}
        updateFunction={() => callUpdateCategoryAPI(selectedCategory?._id || '')}
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
      />)}
    </>
  );
};

export default UnitCategoryPage;