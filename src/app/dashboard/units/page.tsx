'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnits } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const fetchedUnits = await fetchAllUnits();
      console.log('Fetched Units:', fetchedUnits);
      setUnits(
        fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation])
      );
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(units.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = units.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);
  
  // Calculate total pages
  const totalPages = Math.ceil(units.length / recordsPerPage);
  
  // Calculate the starting index for the current page
  const startingIndex = currentPage * recordsPerPage;

  return (
    <div>
      <h1>Units</h1>
      <BasicTable 
        table_fields={UNIT_TABLE_FIELDS} 
        table_records={currentRecords} 
        table_id="table_1" 
        startingIndex={startingIndex} // Pass the starting index
      />
      <NavigateButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

