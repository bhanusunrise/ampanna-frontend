'use client'

import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input'; 
import BasicTable from '@/app/components/Tables/basic_table';
import { CUSTOMER_TABLE_FIELDS } from '@/app/constants/constants';
import { search_handler } from '../functions';
import AddButton from '@/app/components/Buttons/add_button';

const Page: React.FC = () => {
  // Initial data for the table
  const initialTableData = [
    ['Row 1', 'Row 2', 'Row 3'],
    ['Row 4', 'Row 5', 'Row 6'],
    ['Row 7', 'Row 8', 'Row 9'],
  ];

  // State to store filtered data
  const [filteredData, setFilteredData] = useState(initialTableData);

  // Function to handle text input changes and filter the table
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search_handler({
      search_value: e.target.value,
      table_values: initialTableData,
      fields: CUSTOMER_TABLE_FIELDS,
      setFilteredData,
    });
  };

  return (
    <>
      <Row>
        <Col md={6}><h1>Customer</h1></Col>
        <Col md={6}>
          {/* Wrapping AddButton and TextInput inside a div with flexbox */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
            <AddButton label="New Customer" onClickButton={() => {}} btn_id="add_customer" />
            <TextInput
              form_id="search_customer"
              onChangeText={handleSearchChange} // Trigger filtering when input changes
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
          table_fields={CUSTOMER_TABLE_FIELDS}
          table_records={filteredData} // Use the filtered data for rendering
          table_id="table_1"
        />
      </Row>
    </>
  );
};

export default Page;

