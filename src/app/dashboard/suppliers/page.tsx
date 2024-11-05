'use client';

import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import {
  ADD_BUTTON_LABAL,
  ADD_SUPPLIER,
  CLEAR_BUTTON_LABAL,
  SUPPLIER_ADDRESS_LABAL,
  SUPPLIER_ADDRESS_PLACEHOLDER,
  SUPPLIER_EMAIL_LABAL,
  SUPPLIER_EMAIL_PLACEHOLDER,
  SUPPLIER_NAME_LABAL,
  SUPPLIER_NAME_PLACEHOLDER,
  SUPPLIER_PHONE_LABAL,
  SUPPLIER_PHONE_PLACEHOLDER,
  SUPPLIER_TABLE_FIELDS,
  SUPPLIERS_PAGE_NAME,
} from '@/app/constants/constants';
import { loadSuppliers, createSupplier } from './functions';
import NavigateButtons from '@/app/components/Buttons/navigate_button';
import { Col, Row } from 'react-bootstrap';
import AddButton from '@/app/components/Buttons/add_button';
import TextInput from '@/app/components/Forms/text_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import EmailInput from '@/app/components/Forms/email_input';
import NumberInput from '@/app/components/Forms/number_input';

export default function Page() {
  const [supplierName, setSupplierName] = useState('');
  const [supplierAddress, setSupplierAddress] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierContact, setSupplierContact] = useState('');
  const [suppliers, setSuppliers] = useState<string[][]>([]); // State for suppliers
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 10;

   const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  };

  // Load suppliers on component mount
  useEffect(() => {
    async function fetchSuppliers() {
      const fetchedSuppliers = await loadSuppliers();
      const formattedSuppliers = fetchedSuppliers.map((supplier: any) => [
        supplier.supplier_id,
        supplier.supplier_name,
        supplier.phone.toString(),    
        supplier.address,   
        supplier.email,
        formatDate(supplier.createdAt),
        formatDate(supplier.updatedAt)
      ]);
      setSuppliers(formattedSuppliers);
    }

    fetchSuppliers();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(suppliers.length / recordsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = suppliers.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = suppliers.filter((supplier) =>
      supplier[1].toLowerCase().includes(query)
    );
    setSuppliers(filtered);
    setCurrentPage(0);
  };

  const handleAddSupplier = async () => {
    if (!supplierName || !supplierEmail || !supplierContact || !supplierAddress) {
      console.log('Please fill in all fields for the supplier');
      return;
    }

    const supplierData = {
      supplier_name: supplierName,
      email: supplierEmail,
      phone: parseInt(supplierContact, 10),
      address: supplierAddress,
    };

    const result = await createSupplier(supplierData);

    if (result.success) {
      const newSuppliers = await loadSuppliers(); // Reload to fetch the latest list of suppliers
      setSuppliers(newSuppliers);
      setSupplierName('');
      setSupplierEmail('');
      setSupplierContact('');
      setSupplierAddress('');
    } else {
      console.error('Failed to add supplier');
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h3 className="text-primary">{SUPPLIERS_PAGE_NAME}</h3>
        </Col>
        <Col md={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'nowrap' }}>
          <TextInput
            form_id="search_supplier"
            onChangeText={handleSearch}
            form_message=""
            placeholder_text="Search"
            label=""
            value={searchQuery}
          />
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable
            table_fields={SUPPLIER_TABLE_FIELDS}
            table_records={currentRecords}
            table_id="suppliers_table"
            startingIndex={currentPage * recordsPerPage}
            onUpdate={() => {}}
            onDelete={() => {}}
            onRestore={() => {}}
          />
          <NavigateButtons
            currentPage={currentPage}
            totalPages={Math.ceil(suppliers.length / recordsPerPage)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Col>
        <Col md={3}>
          <h3 className="text-primary">{ADD_SUPPLIER}</h3>
          <TextInput
            form_id="supplier_name"
            onChangeText={(e) => setSupplierName(e.target.value)}
            form_message=""
            placeholder_text={SUPPLIER_NAME_PLACEHOLDER}
            label={SUPPLIER_NAME_LABAL}
            value={supplierName}
          />
          <NumberInput
            form_id="supplier_contact"
            onChangeText={(e) => setSupplierContact(e.target.value)}
            form_message=""
            placeholder_text={SUPPLIER_PHONE_PLACEHOLDER}
            label={SUPPLIER_PHONE_LABAL}
            value={supplierContact}
            min_value={0}
            max_value={9999999999}
          />
          <TextInput
            form_id="supplier_address"
            onChangeText={(e) => setSupplierAddress(e.target.value)}
            form_message=""
            placeholder_text={SUPPLIER_ADDRESS_PLACEHOLDER}
            label={SUPPLIER_ADDRESS_LABAL}
            value={supplierAddress}
          />
          <EmailInput
            form_id="supplier_email"
            onChangeText={(e) => setSupplierEmail(e.target.value)}
            form_message=""
            placeholder_text={SUPPLIER_EMAIL_PLACEHOLDER}
            label={SUPPLIER_EMAIL_LABAL}
            value={supplierEmail}
          />
          <br />
          <ClearButton
            label={CLEAR_BUTTON_LABAL}
            onClickButton={() => {
              setSupplierName('');
              setSupplierContact('');
              setSupplierAddress('');
              setSupplierEmail('');
            }}
            btn_id="clear_supplier"
          />
          <AddButton
            label={ADD_BUTTON_LABAL}
            onClickButton={handleAddSupplier}
            btn_id="add_supplier"
          />
        </Col>
      </Row>
    </>
  );
}
