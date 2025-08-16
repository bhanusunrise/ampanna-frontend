'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, ADD_SUPPLIER, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NO_RECORDS_FOUND, SEARCH, SUPPLIER_API, SUPPLIER_NAME_LABAL, SUPPLIER_NAME_PLACEHOLDER, SUPPLIER_SEARCH_PLACEHOLDER, SUPPLIER_TABLE_FIELDS, SUPPLIERS_PAGE_NAME, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_SUPPLIER_MODEL_TITLE } from '@/app/constants/constants';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import SupplierInterface from '@/app/interfaces/supplier_interface';
import ExtraContactNos from '@/app/components/Forms/suppliers/extra_contactnos';
import ExtraAddresses from '@/app/components/Forms/suppliers/extra_addresses';
import ExtraEmails from '@/app/components/Forms/suppliers/extra_emails';
import ExtraWebsites from '@/app/components/Forms/suppliers/extra_websites';
import Checkbox from '@/app/components/Forms/check_box';

const SuppliersPage = () => {
  const [Suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierInterface[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [selectedSupplierForAdd, setSelectedSupplierForAdd] = useState<SupplierInterface | null>({ addresses: [], contactnos: [], emails: [], websites: [] } as unknown as SupplierInterface);;
  const [selectedSupplierForUpdate, setSelectedSupplierForUpdate] = useState<SupplierInterface | null>({ addresses: [], contactnos: [], emails: [], websites: [] } as unknown as SupplierInterface);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isAddressesSelected, setIsAddressesSelected] = useState<boolean>(false);
  const [isContactnosSelected, setIsContactnosSelected] = useState<boolean>(false);
  const [isEmailsSelected, setIsEmailsSelected] = useState<boolean>(false);
  const [isWebsitesSelected, setIsWebsitesSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddressChange = (index: number, newValue: string) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedAddresses = [...(prevItem.addresses || [])];
      updatedAddresses[index] = newValue as string;
  
      return { ...prevItem, addresses: updatedAddresses };
    });
  };
  
  const addNewAddress = () => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        addresses: [...(prevItem.addresses || []), ''],
      };
    });
  };
  
  const removeAddress = (index: number) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        addresses: prevItem.addresses.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleContactChange = (index: number, newNumber: number) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedContactNos = [...(prevItem.contactnos || [])];
      updatedContactNos[index] = newNumber;
  
      return { ...prevItem, contactnos: updatedContactNos };
    });
  };
  
  const addNewContact = () => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        contactnos: [...(prevItem.contactnos || []), 0], // Default value set to 0
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeContact = (index: number) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        contactnos: prevItem.contactnos.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleEmailChange = (index: number, newEmail: string) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedEmails = [...(prevItem.emails || [])];
      updatedEmails[index] = newEmail; // Ensure it's a string
  
      return { ...prevItem, emails: updatedEmails };
    });
  };
  
  const addNewEmail = () => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        emails: [...(prevItem.emails || []), ''], // Initialize with an empty string
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeEmail = (index: number) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        emails: prevItem.emails.filter((_, i) => i !== index) || [],
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleWebsiteChange = (index: number, newUrl: string) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedWebsites = [...(prevItem.websites || [])];
      updatedWebsites[index] = newUrl; // Ensure it's a string
  
      return { ...prevItem, websites: updatedWebsites };
    });
  };
  
  const addNewWebsite = () => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        websites: [...(prevItem.websites || []), ''], // Default empty string
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeWebsite = (index: number) => {
    setSelectedSupplierForAdd((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        websites: prevItem.websites.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleAddressChangeForUpdate = (index: number, newValue: string) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedAddresses = [...(prevItem.addresses || [])];
      updatedAddresses[index] = newValue;
  
      return { ...prevItem, addresses: updatedAddresses };
    });
  };

  const addNewAddressForUpdate = () => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        addresses: [...(prevItem.addresses || []), ''], // Ensure addresses are strings
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeAddressForUpdate = (index: number) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        addresses: prevItem.addresses.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleContactChangeForUpdate = (index: number, newNumber: number) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedContactNos = [...(prevItem.contactnos || [])];
      updatedContactNos[index] = newNumber;
  
      return { ...prevItem, contactnos: updatedContactNos };
    });
  };
  
  const addNewContactForUpdate = () => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        contactnos: [...(prevItem.contactnos || []), 0], // Default value set to 0
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeContactForUpdate = (index: number) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        contactnos: prevItem.contactnos.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleEmailChangeForUpdate = (index: number, newEmail: string) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedEmails = [...(prevItem.emails || [])];
      updatedEmails[index] = newEmail ; // Ensure object structure is preserved
  
      return { ...prevItem, emails: updatedEmails };
    });
  };
  
  const addNewEmailForUpdate = () => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        emails: [...(prevItem.emails || []), ''], // Ensure emails are strings
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeEmailForUpdate = (index: number) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        emails: prevItem.emails.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

  const handleWebsiteChangeForUpdate = (index: number, newUrl: string) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
  
      const updatedWebsites = [...(prevItem.websites || [])];
      updatedWebsites[index] = newUrl ; // Ensuring object structure is maintained
  
      return { ...prevItem, websites: updatedWebsites };
    });
  };
  
  const addNewWebsiteForUpdate = () => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        websites: [...(prevItem.websites || []), ''], // Default empty string for websites
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };
  
  const removeWebsiteForUpdate = (index: number) => {
    setSelectedSupplierForUpdate((prevItem) => {
      if (!prevItem) return prevItem;
      return {
        ...prevItem,
        websites: prevItem.websites.filter((_, i) => i !== index),
        _id: prevItem._id || '', // Ensure _id is always a valid string
      };
    });
  };

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
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add supplier');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Supplier:', data);
        fetchSuppliers();
        setSelectedSupplierForAdd({
          _id: '', // Default value for _id
          addresses: [],
          contactnos: [],
          emails: [],
          websites: [],
          name: '',
          description: ''
        });
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
          (isContactnosSelected && supplier.contactnos.some(contact => contact.toString().toLowerCase().includes(searchLower))) ||
          (isEmailsSelected && supplier.emails.some(email => email.toLowerCase().includes(searchLower))) ||
          (isWebsitesSelected && supplier.websites.some(website => website.toLowerCase().includes(searchLower))) ||
          

          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isNameSelected && !isDescriptionSelected && !isAddressesSelected && !isContactnosSelected && !isEmailsSelected && !isWebsitesSelected && (
            supplier._id.toLowerCase().includes(searchLower) ||
            supplier.name.toLowerCase().includes(searchLower) ||
            supplier.description.toLowerCase().includes(searchLower) ||
            supplier.addresses.some(address => address.toLowerCase().includes(searchLower)) ||
            supplier.contactnos.some(contact => contact.toString().includes(searchLower)) ||
            supplier.emails.some(email => email.toLowerCase().includes(searchLower)) ||
            supplier.websites.some(website => website.toLowerCase().includes(searchLower))
          ))
        );
      });
      setFilteredSuppliers(filtered);
    }
  }, [searchQuery, Suppliers, isIdSelected, isNameSelected, isDescriptionSelected, isAddressesSelected, isContactnosSelected, isEmailsSelected, isWebsitesSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{SUPPLIERS_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={SUPPLIER_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className='d-flex mt-3'>
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[0]}
              checked={isIdSelected}
              onChange={(e) => setIsIdSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[1]}
              checked={isNameSelected}
              onChange={(e) => setIsNameSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[2]}
              checked={isDescriptionSelected}
              onChange={(e) => setIsDescriptionSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[3]}
              checked={isContactnosSelected}
              onChange={(e) => setIsContactnosSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[4]}
              checked={isAddressesSelected}
              onChange={(e) => setIsAddressesSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[5]}
              checked={isEmailsSelected}
              onChange={(e) => setIsEmailsSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
          <Checkbox
              label={SUPPLIER_TABLE_FIELDS[6]}
              checked={isWebsitesSelected}
              onChange={(e) => setIsWebsitesSelected(e.target.checked)} form_id={''} form_message={''} className='me-2 text-primary' />
        </div>
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
                      <span key={index} id={contactno.toString()}>
                        <a href={`tel:+94${contactno}`}>
                          <Badge bg="info" className='me-1' id = {contactno.toString()}>
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
                          <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
                          <Badge bg="primary" className='me-1' id = {website}>
                            {supplier.websites[index]}
                          </Badge>
                          </a>
                      </span>
                    ))}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => {setSelectedSupplierForUpdate(supplier); setShowUpdateModal(true);  console.log(selectedSupplierForUpdate)}}>{UPDATE_BUTTON_LABAL}</button>
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
          <h3 className='text-primary'>{ADD_SUPPLIER}</h3>

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

          

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[3]}</label>

          <ExtraContactNos
            contactNos={selectedSupplierForAdd?.contactnos || []}
            onContactChange={handleContactChange}
            onAddContact={addNewContact}
            onRemoveContact={removeContact}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[4]}</label>

          <ExtraAddresses
            addresses={selectedSupplierForAdd?.addresses || []}
            onAddressChange={handleAddressChange}
            onAddRow={addNewAddress}
            onRemoveRow={removeAddress}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[5]}</label>

          <ExtraEmails
            emails={selectedSupplierForAdd?.emails || []}
            onEmailChange={handleEmailChange}
            onAddEmail={addNewEmail}
            onRemoveEmail={removeEmail}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[6]}</label>
          <ExtraWebsites
            websites={selectedSupplierForAdd?.websites || []}
            onWebsiteChange={handleWebsiteChange}
            onAddWebsite={addNewWebsite}
            onRemoveWebsite={removeWebsite}
          />
          

          <Button variant='success' className='mt-3' onClick={addSupplier}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {showUpdateModal && selectedSupplierForUpdate && (

      <Modal show={showUpdateModal}>
        <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
          <Modal.Title className='text-primary'>{UPDATE_SUPPLIER_MODEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <TextInput
            form_id="supplier_name"
            onChangeText={(e) => setSelectedSupplierForUpdate({ ...selectedSupplierForUpdate, name: e.target.value })}
            form_message=""
            placeholder_text={SUPPLIER_NAME_PLACEHOLDER}
            label={SUPPLIER_NAME_LABAL}
            value={selectedSupplierForUpdate?.name}
          />

           <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedSupplierForUpdate({ ...selectedSupplierForUpdate, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={selectedSupplierForUpdate?.description}
          />

          

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[3]}</label>

          <ExtraContactNos
            contactNos={selectedSupplierForUpdate?.contactnos || []}
            onContactChange={handleContactChangeForUpdate}
            onAddContact={addNewContactForUpdate}
            onRemoveContact={removeContactForUpdate}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[4]}</label>

          <ExtraAddresses
            addresses={selectedSupplierForUpdate?.addresses || []}
            onAddressChange={handleAddressChangeForUpdate}
            onAddRow={addNewAddressForUpdate}
            onRemoveRow={removeAddressForUpdate}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[5]}</label>

          <ExtraEmails
            emails={selectedSupplierForUpdate?.emails || []}
            onEmailChange={handleEmailChangeForUpdate}
            onAddEmail={addNewEmailForUpdate}
            onRemoveEmail={removeEmailForUpdate}
          />

          <label className='text-primary mt-2'>{SUPPLIER_TABLE_FIELDS[6]}</label>
          <ExtraWebsites
            websites={selectedSupplierForUpdate?.websites || []}
            onWebsiteChange={handleWebsiteChangeForUpdate}
            onAddWebsite={addNewWebsiteForUpdate}
            onRemoveWebsite={removeWebsiteForUpdate}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            {BACK}
          </Button>
          <Button variant="primary" onClick={() => {console.log(selectedSupplierForUpdate._id); callUpdateCategoryAPI(selectedSupplierForUpdate._id); setShowUpdateModal(false); }}>
            {UPDATE}
          </Button>
        </Modal.Footer>
      </Modal>
      )}

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