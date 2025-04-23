'use client';

import React, { useEffect, useState } from 'react';
import { NO_RECORDS_FOUND, UNIT_CATEGORY_API, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS } from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Table } from 'react-bootstrap';

const UnitCategoryPage = () => {
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<UnitCategoryInterface[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUnitCategories();
  }, []);

  return (
    <>
      <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>
      <Table striped bordered hover>
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
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedCategoryId(category._id)}>Edit</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => setSelectedCategoryId(category._id)}>Delete</button>
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
    </>
  );
};

export default UnitCategoryPage;