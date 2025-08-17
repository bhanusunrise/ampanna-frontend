'use client';

import React, { useEffect, useState } from 'react';
import {
  ADD_BUTTON_LABAL, ADD_ITEM, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM,
  DELETE_CONFIRM_MESSEGE, ITEMS_API, ITEMS_PAGE_NAME, ITEMS_SEARCH_PLACEHOLDER, ITEMS_TABLE_FIELDS,
  NO_RECORDS_FOUND, SEARCH, UNIT_API, UNIT_CATEGORY_API, UNIT_CATEGORY_NAME_LABAL,
  UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_ITEM_MODEL_TITLE
} from '@/app/constants/constants';
import UnitCategoryInterface from '@/app/interfaces/unit_category_interface';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import UnitInterface from '@/app/interfaces/unit_interface';
import ItemInterface from '@/app/interfaces/item_interface';
import ExtraParameters from '@/app/components/Forms/extra_parameters';
import Checkbox from '@/app/components/Forms/check_box';
import UpdateItemInterface from '@/app/interfaces/update_item_interface';

const ItemsPage = () => {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [unitCategories, setUnitCategories] = useState<UnitCategoryInterface[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<UnitInterface[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [selectedItemForAdd, setSelectedItemForAdd] = useState<ItemInterface | null>(
    { other_parameters: [] } as unknown as ItemInterface
  );
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState<ItemInterface | null>(
    { other_parameters: [] } as unknown as ItemInterface
  );

  const [selectedDefaultUnitId, setSelectedDefaultUnitId] = useState<string | null>(null);
  const [conveterdUnits, setConvertedUnits] = useState<UpdateItemInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategoryInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isOtherParametersSelected, setIsOtherParametersSelected] = useState<boolean>(false);
  const [isMainUnitNameSelected, setIsMainUnitNameSelected] = useState<boolean>(false);
  const [isOtherUnitNamesSelected, setIsOtherUnitNamesSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mark as intentionally used (no-op) to satisfy lint if not referenced elsewhere
  void selectedCategory;

  // Ensure we always spread a fully-typed ItemInterface, not null/partial
  const toDraftItem = (prev: ItemInterface | null): ItemInterface => ({
    _id: prev?._id ?? '',
    name: prev?.name ?? '',
    description: prev?.description ?? '',
    main_unit_id: prev?.main_unit_id ?? '',
    other_unit_ids: prev?.other_unit_ids ?? [],
    other_parameters: prev?.other_parameters ?? [],
    barcode: prev?.barcode ?? '',
    // names are often present on fetch; default safely
    main_unit_name: (prev as any)?.main_unit_name ?? '',
    other_unit_names: (prev as any)?.other_unit_names ?? [],
    category: prev?.category ?? '', // Add default for category property
  });

  const handleParameterChange = (
    index: number,
    field: 'parameter_name' | 'value',
    newValue: string
  ) => {
    setSelectedItemForAdd((prevItem) => {
      const base = toDraftItem(prevItem);
      const updated = [...(base.other_parameters || [])];
      if (!updated[index]) updated[index] = { parameter_name: '', value: '' };
      updated[index][field] = newValue;
      return { ...base, other_parameters: updated };
    });
  };

  const handleParameterChangeForUpdate = (
    index: number,
    field: 'parameter_name' | 'value',
    newValue: string
  ) => {
    setSelectedItemForUpdate((prevItem) => {
      const base = toDraftItem(prevItem);
      const updated = [...(base.other_parameters || [])];
      if (!updated[index]) updated[index] = { parameter_name: '', value: '' };
      updated[index][field] = newValue;
      return { ...base, other_parameters: updated };
    });
  };

  const handleArrayListingForUpdate = (
    selected_unit_id: string,
    selected_unit_name: string,
    other_unit_ids: string[],
    other_unit_names: string[]
  ) => {
    const updated_ids = [selected_unit_id, ...other_unit_ids];
    const updated_names = [selected_unit_name, ...other_unit_names];
    console.log('Updated IDs:', updated_ids);
    console.log('Updated Names:', updated_names);
    setConvertedUnits([{ unit_ids: updated_ids, unit_names: updated_names }]);
  };

  const addNewRow = () => {
    setSelectedItemForAdd((prevItem) => {
      const base = toDraftItem(prevItem);
      return {
        ...base,
        other_parameters: [
          ...(base.other_parameters || []),
          { parameter_name: '', value: '' },
        ],
      };
    });
  };

  const removeRow = (index: number) => {
    setSelectedItemForAdd((prevItem) => {
      const base = toDraftItem(prevItem);
      return {
        ...base,
        other_parameters: (base.other_parameters || []).filter((_, i) => i !== index),
      };
    });
  };

  const addNewRowForUpdate = () => {
    setSelectedItemForUpdate((prevItem) => {
      const base = toDraftItem(prevItem);
      return {
        ...base,
        other_parameters: [
          ...(base.other_parameters || []),
          { parameter_name: '', value: '' },
        ],
      };
    });
  };

  const removeRowForUpdate = (index: number) => {
    setSelectedItemForUpdate((prevItem) => {
      const base = toDraftItem(prevItem);
      return {
        ...base,
        other_parameters: (base.other_parameters || []).filter((_, i) => i !== index),
      };
    });
  };

  const fetchUnitCategories = async () => {
    try {
      const response = await fetch(`${UNIT_CATEGORY_API}fetch_all_unit_categories`);
      if (!response.ok) throw new Error('Failed to fetch unit categories');

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
      if (!response.ok) throw new Error('Failed to fetch unit');

      const { success, data } = (await response.json()) as {
        success: boolean;
        data: UnitInterface[];
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
      if (!response.ok) throw new Error('Failed to fetch items');
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
  };

  const callUpdateItemAPI = async () => {
    try {
      const response = await fetch(`${ITEMS_API}update_item`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedItemForUpdate?._id,
          name: selectedItemForUpdate?.name,
          description: selectedItemForUpdate?.description,
          main_unit_id: selectedDefaultUnitId,
          other_unit_ids: conveterdUnits[0].unit_ids,
          other_parameters: selectedItemForUpdate?.other_parameters,
        }),
      });
      if (!response.ok) throw new Error('Failed to update items');

      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Item:', data);
        setShowUpdateModal(false);
        fetchItems();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const addItem = async () => {
    try {
      console.log('Selected Item:', selectedItemForAdd);
      const response = await fetch(`${ITEMS_API}create_item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedItemForAdd?.name,
          description: selectedItemForAdd?.description,
          main_unit_id: selectedItemForAdd?.main_unit_id,
          other_unit_ids: selectedItemForAdd?.other_unit_ids,
          other_parameters: selectedItemForAdd?.other_parameters,
          barcode: selectedItemForAdd?.barcode,
        }),
      });

      fetchItems();
      if (!response.ok) throw new Error('Failed to add item');

      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Item:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`${ITEMS_API}delete_item?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete item');

      const { success, data } = await response.json();
      fetchItems();
      if (success && data) {
        console.log('Deleted Conversion:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

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
        (isOtherParametersSelected && item.other_parameters.some(param =>
          param.parameter_name.toLowerCase().includes(searchLower) ||
          param.value.toLowerCase().includes(searchLower)
        )) ||
        (isMainUnitNameSelected && item.main_unit_name?.toLowerCase().includes(searchLower)) ||
        (isOtherUnitNamesSelected && item.other_unit_names.some(unitName => unitName.toLowerCase().includes(searchLower))) ||
        (!isIdSelected && !isNameSelected && !isDescriptionSelected &&
          !isOtherParametersSelected && !isMainUnitNameSelected && !isOtherUnitNamesSelected &&
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
  }, [
    searchQuery, items, isIdSelected, isNameSelected, isDescriptionSelected,
    isOtherParametersSelected, isMainUnitNameSelected, isOtherUnitNamesSelected
  ]);

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
          <div className="d-flex mt-2">
            <Checkbox label={ITEMS_TABLE_FIELDS[0]} onChange={(e) => setIsIdSelected(e.target.checked)} form_id="id" form_message="" checked={isIdSelected} className="ms-1 text-primary" />
            <Checkbox label={ITEMS_TABLE_FIELDS[1]} onChange={(e) => setIsNameSelected(e.target.checked)} form_id="name" form_message="" checked={isNameSelected} className="ms-1 text-primary" />
            <Checkbox label={ITEMS_TABLE_FIELDS[5]} onChange={(e) => setIsDescriptionSelected(e.target.checked)} form_id="description" form_message="" checked={isDescriptionSelected} className="ms-1 text-primary" />
            <Checkbox label={ITEMS_TABLE_FIELDS[3]} onChange={(e) => setIsMainUnitNameSelected(e.target.checked)} form_id="main_unit_name" form_message="" checked={isMainUnitNameSelected} className="ms-1 text-primary" />
            <Checkbox label={ITEMS_TABLE_FIELDS[4]} onChange={(e) => setIsOtherUnitNamesSelected(e.target.checked)} form_id="other_unit_names" form_message="" checked={isOtherUnitNamesSelected} className="ms-1 text-primary" />
            <Checkbox label={ITEMS_TABLE_FIELDS[6]} onChange={(e) => setIsOtherParametersSelected(e.target.checked)} form_id="other_parameters" form_message="" checked={isOtherParametersSelected} className="ms-1 text-primary" />
          </div>
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

                      <td id={item.main_unit_id}>
                        <Badge bg="primary" className='me-1' id={item.main_unit_id}>{item.main_unit_name}</Badge>
                      </td>
                      <td>
                        {item.other_unit_ids.map((unitId, index) => (
                          <span key={index} id={unitId}>
                            <Badge bg="secondary" className='me-1' id={unitId}>
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
                        ))}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setSelectedItemForUpdate(item);
                            handleArrayListingForUpdate(
                              item.main_unit_id,
                              item.main_unit_name,
                              item.other_unit_ids,
                              item.other_unit_names
                            );
                            setShowUpdateModal(true);
                            console.log(conveterdUnits);
                          }}
                        >
                          {UPDATE_BUTTON_LABAL}
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedItemId(item._id);
                            setSelectedDefaultUnitId(item.main_unit_id);
                          }}
                        >
                          {DELETE_BUTTON_LABAL}
                        </button>
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
          <h3 className='text-primary'>{ADD_ITEM}</h3>

          <TextInput
            label={ITEMS_TABLE_FIELDS[1]}
            onChangeText={(e) =>
              setSelectedItemForAdd(prev => ({ ...toDraftItem(prev), name: e.target.value }))
            }
            form_id="name"
            form_message=""
            placeholder_text={ITEMS_TABLE_FIELDS[1]}
            value={selectedItemForAdd?.name || ''}
          />
          <TextInput
            label={ITEMS_TABLE_FIELDS[5]}
            onChangeText={(e) =>
              setSelectedItemForAdd(prev => ({ ...toDraftItem(prev), description: e.target.value }))
            }
            form_id="description"
            form_message=""
            placeholder_text={ITEMS_TABLE_FIELDS[5]}
            value={selectedItemForAdd?.description || ''}
          />
          <TextInput
            label={ITEMS_TABLE_FIELDS[2]}
            onChangeText={(e) =>
              setSelectedItemForAdd(prev => ({ ...toDraftItem(prev), barcode: e.target.value }))
            }
            form_id="barcode"
            form_message=""
            placeholder_text={ITEMS_TABLE_FIELDS[2]}
            value={selectedItemForAdd?.barcode || ''}
          />

          <label className="form-label mt-2 text-primary">{UNIT_CATEGORY_NAME_LABAL}</label>
          <select
            className="form-select"
            onChange={(e) => {
              setSelectedCategory(unitCategories.find(category => category._id === e.target.value) || null);
              setFilteredUnits([]);
              fetchUnitsForSelectedCategory(e.target.value);
            }}
          >
            {unitCategories.map((category, index) => (
              <option key={index} value={category._id}>{category.unit_category_name}</option>
            ))}
          </select>

          <label className="form-label mt-2 text-primary">{ITEMS_TABLE_FIELDS[3]}</label>
          <select
            className="form-select"
            onChange={(e) =>
              setSelectedItemForAdd(prev => ({ ...toDraftItem(prev), main_unit_id: e.target.value }))
            }
          >
            {filteredUnits.map((unit, index) => (
              <option key={index} value={unit._id}>{unit.unit_name}</option>
            ))}
          </select>

          <label className="form-label mt-2 text-primary">{ITEMS_TABLE_FIELDS[4]}</label>
          <div className="form-check">
            {filteredUnits.map((unit, index) => (
              <Checkbox
                key={index}
                label={unit.unit_name}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedItemForAdd((prevItem) => {
                    const base = toDraftItem(prevItem);
                    const updatedOtherUnitIds = isChecked
                      ? [...(base.other_unit_ids || []), unit._id]
                      : (base.other_unit_ids || []).filter(id => id !== unit._id);
                    return { ...base, other_unit_ids: updatedOtherUnitIds };
                  });
                } } form_id={''} form_message={''} checked={false}              />
            ))}
          </div>

          <label className="form-label mt-2 text-primary">{ITEMS_TABLE_FIELDS[6]}</label>
          <ExtraParameters
            other_parameters={selectedItemForAdd?.other_parameters || []}
            onParameterChange={handleParameterChange}
            onAddRow={addNewRow}
            onRemoveRow={removeRow}
          />

          <Button variant='success' className='mt-3' onClick={addItem}>
            {ADD_BUTTON_LABAL}
          </Button>
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
            <Button
              variant="danger"
              onClick={() => { deleteItem(selectedItemId); setShowDeleteModal(false); }}
            >
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showUpdateModal && selectedItemForUpdate && (
        <Modal show={showUpdateModal}>
          <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
            <Modal.Title>{UPDATE_ITEM_MODEL_TITLE}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextInput
              label={ITEMS_TABLE_FIELDS[1]}
              onChangeText={(e) =>
                setSelectedItemForUpdate(prev => ({ ...toDraftItem(prev), name: e.target.value }))
              }
              form_id="name"
              form_message=""
              placeholder_text={ITEMS_TABLE_FIELDS[1]}
              value={selectedItemForUpdate?.name || ''}
            />
            <TextInput
              label={ITEMS_TABLE_FIELDS[5]}
              onChangeText={(e) =>
                setSelectedItemForUpdate(prev => ({ ...toDraftItem(prev), description: e.target.value }))
              }
              form_id="description"
              form_message=""
              placeholder_text={ITEMS_TABLE_FIELDS[5]}
              value={selectedItemForUpdate?.description || ''}
            />
            <TextInput
              label={ITEMS_TABLE_FIELDS[2]}
              onChangeText={(e) =>
                setSelectedItemForUpdate(prev => ({ ...toDraftItem(prev), barcode: e.target.value }))
              }
              form_id="barcode"
              form_message=""
              placeholder_text={ITEMS_TABLE_FIELDS[2]}
              value={selectedItemForUpdate?.barcode || ''}
            />

            <label className="form-label mt-2 text-primary">{ITEMS_TABLE_FIELDS[3]}</label>
            <select
              onChange={(e) => { setSelectedDefaultUnitId(e.target.value); }}
              className='form-select'
            >
              {conveterdUnits[0]?.unit_ids.map((id, index) => (
                <option key={index} value={id}>
                  {conveterdUnits[0].unit_names[index]}
                </option>
              ))}
            </select>

            <label className="form-label mt-2 text-primary">{ITEMS_TABLE_FIELDS[6]}</label>
            <ExtraParameters
              other_parameters={selectedItemForUpdate?.other_parameters || []}
              onParameterChange={handleParameterChangeForUpdate}
              onAddRow={addNewRowForUpdate}
              onRemoveRow={removeRowForUpdate}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              {BACK}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedItemForUpdate(prev => ({ ...toDraftItem(prev), main_unit_id: selectedDefaultUnitId || '' }));
                setSelectedItemForUpdate(prev => ({ ...toDraftItem(prev), other_unit_ids: conveterdUnits[0]?.unit_ids || [] }));
                callUpdateItemAPI();
                setShowUpdateModal(false);
              }}
            >
              {UPDATE}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ItemsPage;
