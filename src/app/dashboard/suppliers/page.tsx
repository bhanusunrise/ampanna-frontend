'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NEW_UNIT_TITLE, NO_RECORDS_FOUND, SEARCH, SUPPLIER_API, SUPPLIER_NAME_LABAL, SUPPLIER_NAME_PLACEHOLDER, SUPPLIER_SEARCH_PLACEHOLDER, SUPPLIER_TABLE_FIELDS, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import SupplierInterface from '@/app/interfaces/supplier_interface';

const SuppliersPage = () => {
  const [Suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierInterface[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [selectedSupplierForAdd, setSelectedSupplierForAdd] = useState<SupplierInterface | null>(null);
  const [selectedSupplierForUpdate, setSelectedSupplierForUpdate] = useState<SupplierInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isAddressesSelected, setIsAddressesSelected] = useState<boolean>(false);
  const [isContactnosSelected, setIsContactnosSelected] = useState<boolean>(false);
  const [isEmailsSelected, setIsEmailsSelected] = useState<boolean>(false);
  const [isWebsitesSelected, setIsWebsitesSelected] = useState<boolean>(false);
  const [isOtherParametersSelected, setIsOtherParametersSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${SUPPLIER_API}fetch_all_suppliers`);
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers');
        }

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setSuppliers(data);
          setFilteredSuppliers(data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };


  const callUpdateCategoryAPI = async (id: string) => {
    try {
      const response = await fetch(`${SUPPLIER_API}update_supplier`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : id,
          name: selectedSupplierForUpdate?.name,
          addresses: selectedSupplierForUpdate?.addresses,
          contactnos: selectedSupplierForUpdate?.contactnos,
          emails: selectedSupplierForUpdate?.emails,
          websites: selectedSupplierForUpdate?.websites,
          description: selectedSupplierForUpdate?.description,
          other_parameters: selectedSupplierForUpdate?.other_parameters,

        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update supplier');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Supplier:', data);
        setShowUpdateModal(false);
        fetchSuppliers();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  }

  const addSupplier = async () => {
    try {
      const response = await fetch(`${SUPPLIER_API}create_supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedSupplierForAdd?.name,
          addresses: selectedSupplierForAdd?.addresses,
          contactnos: selectedSupplierForAdd?.contactnos,
          emails: selectedSupplierForAdd?.emails,
          websites: selectedSupplierForAdd?.websites,
          description: selectedSupplierForAdd?.description,
          other_parameters: selectedSupplierForAdd?.other_parameters,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add supplier');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Supplier:', data);
        fetchSuppliers();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  }

  const deleteSupplier = async (id: string) => {
    try {
      const response = await fetch(`${SUPPLIER_API}delete_supplier?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete supplier');
      }
      const { success, data } = await response.json();
      fetchSuppliers();
      if (success && data) {
        console.log('Deleted Supplier:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  }
        
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuppliers(Suppliers);
    } else {
      const filtered = Suppliers.filter(supplier => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && supplier._id.toLowerCase().includes(searchLower)) ||
          (isNameSelected && supplier.name.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && supplier.description.toLowerCase().includes(searchLower)) ||
          (isAddressesSelected && supplier.addresses.some(address => address.toLowerCase().includes(searchLower))) ||
          (isContactnosSelected && supplier.contactnos.some(contact => contact.toLowerCase().includes(searchLower))) ||
          (isEmailsSelected && supplier.emails.some(email => email.toLowerCase().includes(searchLower))) ||
          (isWebsitesSelected && supplier.websites.some(website => website.toLowerCase().includes(searchLower))) ||
          (isOtherParametersSelected && supplier.other_parameters.some(param => param.parameter_name.toLowerCase().includes(searchLower))) ||

          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isNameSelected && !isDescriptionSelected && (
            supplier._id.toLowerCase().includes(searchLower) ||
            supplier.name.toLowerCase().includes(searchLower) ||
            supplier.description.toLowerCase().includes(searchLower) ||
            supplier.addresses.some(address => address.toLowerCase().includes(searchLower)) ||
            supplier.contactnos.some(contact => contact.toLowerCase().includes(searchLower)) ||
            supplier.emails.some(email => email.toLowerCase().includes(searchLower)) ||
            supplier.websites.some(website => website.toLowerCase().includes(searchLower)) ||
            supplier.other_parameters.some(param => param.parameter_name.toLowerCase().includes(searchLower)) ||
            supplier.other_parameters.some(param => param.value.toLowerCase().includes(searchLower))
          ))
        );
      });
      setFilteredSuppliers(filtered);
    }
  }, [searchQuery, Suppliers, isIdSelected, isNameSelected, isDescriptionSelected, isAddressesSelected, isContactnosSelected, isEmailsSelected, isWebsitesSelected, isOtherParametersSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={SUPPLIER_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className="scrollable-table">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {SUPPLIER_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier._id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.description}</td>
                  <td>
                    {supplier.contactnos.map((contactno, index) => (
                      <span key={index} id={contactno}>
                        <a href={`tel:${contactno}`}>
                          <Badge bg="info" className='me-1' id = {contactno}>
                            {supplier.contactnos[index]}
                          </Badge>
                        </a>
                      </span>
                    ))}
                  </td>
                  <td>
                    {supplier.addresses.map((address, index) => (
                      <span key={index} id={address}>
                    
                          <Badge bg="success" className='me-1' id = {address}>
                            {supplier.addresses[index]}
                          </Badge>

                      </span>
                    ))}
                  </td>
                  <td>
                    {supplier.emails.map((email, index) => (
                      <span key={index} id={email}>
                          <a href={`mailto:${email}`}>
                          <Badge bg="warning" className='me-1' id = {email}>
                            {supplier.emails[index]}
                          </Badge>
                          </a>
                      </span>
                    ))}
                  </td>
                  <td>{supplier.websites.map((website, index) => (
                      <span key={index} id={website}>
                          <a href={website} target="_blank">
                          <Badge bg="primary" className='me-1' id = {website}>
                            {supplier.websites[index]}
                          </Badge>
                          </a>
                      </span>
                    ))}</td>
                  <td>
                  {supplier.other_parameters.map((parameter, index) => (
                    <Badge key={index} bg="secondary" className="me-1">
                      {parameter.parameter_name}: {parameter.value}
                    </Badge>
                  ))}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" >{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedSupplierId(supplier._id)}}>{DELETE_BUTTON_LABAL}</button>
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
            form_id="supplier_name"
            onChangeText={(e) => setSelectedSupplierForAdd({ ...selectedSupplierForAdd, name: e.target.value })}
            form_message=""
            placeholder_text={SUPPLIER_NAME_PLACEHOLDER}
            label={SUPPLIER_NAME_LABAL}
            value={selectedSupplierForAdd?.name}
          />

           <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedSupplierForAdd({ ...selectedSupplierForAdd, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedSupplierForAdd?.description}
          />

          <Button variant='success' className='mt-3' onClick={addSupplier}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {/*showUpdateModal && selectedCategory && (

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
      )*/}

      {showDeleteModal && selectedSupplierId && (
        
        <Modal show={showDeleteModal}>
          <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
            <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedSupplierId}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {BACK}
            </Button>
            <Button variant="danger" onClick={() => {deleteSupplier(selectedSupplierId); setShowDeleteModal(false); }}>
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SuppliersPage;