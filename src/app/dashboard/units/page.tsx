'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_TABLE_FIELDS } from '@/app/constants/constants';
import { fetchAllUnits } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';

export default function Page() {
  const [units, setUnits] = useState<string[][]>([]);
  const [filteredUnits, setFilteredUnits] = useState<string[][]>([]); // To store filtered results
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // For the search query
  const recordsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const fetchedUnits = await fetchAllUnits();
      console.log('Fetched Units:', fetchedUnits);
      setUnits(
        fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation])
      );
      setFilteredUnits(
        fetchedUnits.map((unit: any) => [unit.unit_id, unit.unit_name, unit.abbreviation])
      ); // Initially display all units
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredUnits.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = filteredUnits.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUnits.length / recordsPerPage);

  // Calculate the starting index for the current page
  const startingIndex = currentPage * recordsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the units based on the search query (unit_name or abbreviation)
    const filtered = units.filter(
      (unit) =>
        unit[1].toLowerCase().includes(query) || unit[2].toLowerCase().includes(query)
    );
    setFilteredUnits(filtered);
    setCurrentPage(0); // Reset to the first page after search
  };

  return (
    <>
      <Row>
        <Col md={6}><h1>Units</h1></Col>
        <Col md={6}>
          {/* Wrapping AddButton and TextInput inside a div with flexbox */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
            <AddButton label="New Unit" onClickButton={() => {}} btn_id="add_unit" />
            <TextInput
              form_id="search_unit"
              onChangeText={handleSearch} // Trigger filtering when input changes
              form_message=""
              placeholder_text="Search"
              label=""
            />
          </div>
          <br />
        </Col>
      </Row>
      <Row>
        <BasicTable 
          table_fields={UNIT_TABLE_FIELDS} 
          table_records={currentRecords} 
          table_id="units_table" 
          startingIndex={startingIndex} // Pass the starting index
        />
        <NavigateButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Row>
    </>
  );
}
