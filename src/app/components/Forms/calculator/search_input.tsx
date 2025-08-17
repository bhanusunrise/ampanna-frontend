'use client';

import React, { useEffect, useState } from 'react';
import { Form, ListGroup, Row, Col } from 'react-bootstrap';
import Checkbox from '@/app/components/Forms/check_box';
import ItemInterface from '@/app/interfaces/item_interface';
import { ITEMS_API, ITEMS_TABLE_FIELDS, OUT_OF_STOCK, STOCKS_API } from '@/app/constants/constants';

interface SearchInputProps {
  label?: string;
  form_id: string;
  placeholder_text: string;
  onSelectItem: (item: ItemInterface) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ label, form_id, placeholder_text, onSelectItem }) => {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Filtering states
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isOtherParametersSelected, setIsOtherParametersSelected] = useState<boolean>(false);
  const [isMainUnitNameSelected, setIsMainUnitNameSelected] = useState<boolean>(false);
  const [isOtherUnitNamesSelected, setIsOtherUnitNamesSelected] = useState<boolean>(false);

  // Availability cache: item_id -> true (has stock) | false (no stock)
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  // Fetch all items once
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${ITEMS_API}fetch_all_items`);
        if (!response.ok) throw new Error('Failed to fetch items');

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setItems(data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on query + toggles
  useEffect(() => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();

      const filtered = items.filter(item =>
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
          (item._id.toLowerCase().includes(searchLower) ||
            item.name.toLowerCase().includes(searchLower) ||
            item.description?.toLowerCase().includes(searchLower) ||
            item.other_parameters.some(param =>
              param.parameter_name.toLowerCase().includes(searchLower) ||
              param.value.toLowerCase().includes(searchLower)
            ) ||
            item.main_unit_name?.toLowerCase().includes(searchLower) ||
            item.other_unit_names.some(unitName => unitName.toLowerCase().includes(searchLower)))
        )
      );

      setFilteredItems(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [
    searchQuery,
    items,
    isIdSelected,
    isNameSelected,
    isDescriptionSelected,
    isOtherParametersSelected,
    isMainUnitNameSelected,
    isOtherUnitNamesSelected
  ]);

  // For visible results, look up stock availability and cache it
  useEffect(() => {
    if (!showDropdown || filteredItems.length === 0) return;

    // Check only the first N to limit requests when list is long
    const toCheck = filteredItems
      .slice(0, 15)
      .map(i => i._id)
      .filter(id => availability[id] === undefined);

    if (toCheck.length === 0) return;

    (async () => {
      const updates: Record<string, boolean> = {};
      await Promise.all(
        toCheck.map(async (id) => {
          try {
            const resp = await fetch(`${STOCKS_API}fetch_all_stocks?item_id=${id}`);
            const { success, data } = await resp.json();
            updates[id] = !!(success && Array.isArray(data) && data.length > 0);
          } catch {
            // If check fails, be conservative and mark as unavailable
            updates[id] = false;
          }
        })
      );
      setAvailability(prev => ({ ...prev, ...updates }));
    })();
  }, [showDropdown, filteredItems, availability]);

  return (
    <div className="position-relative">
      {label && <Form.Label htmlFor={form_id} className="text-primary cursor-pointer">{label}</Form.Label>}
      <Form.Control
        type="text"
        id={form_id}
        placeholder={placeholder_text}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        size="sm"
      />

      {/* Filtering Options */}
      <Row className="mt-2">
        <Col md={12} className='d-flex gap-2'>
          <Checkbox label={ITEMS_TABLE_FIELDS[0]} onChange={(e) => setIsIdSelected(e.target.checked)} form_id="id-filter" form_message="" checked={isIdSelected} className='text-primary' />
          <Checkbox label={ITEMS_TABLE_FIELDS[1]} onChange={(e) => setIsNameSelected(e.target.checked)} form_id="name-filter" form_message="" checked={isNameSelected} className='text-primary' />
          <Checkbox label={ITEMS_TABLE_FIELDS[2]} onChange={(e) => setIsDescriptionSelected(e.target.checked)} form_id="description-filter" form_message="" checked={isDescriptionSelected} className='text-primary' />
          <Checkbox label={ITEMS_TABLE_FIELDS[3]} onChange={(e) => setIsOtherParametersSelected(e.target.checked)} form_id="other-params-filter" form_message="" checked={isOtherParametersSelected} className='text-primary' />
          <Checkbox label={ITEMS_TABLE_FIELDS[4]} onChange={(e) => setIsMainUnitNameSelected(e.target.checked)} form_id="main-unit-name-filter" form_message="" checked={isMainUnitNameSelected} className='text-primary' />
          <Checkbox label={ITEMS_TABLE_FIELDS[5]} onChange={(e) => setIsOtherUnitNamesSelected(e.target.checked)} form_id="other-unit-names-filter" form_message="" checked={isOtherUnitNamesSelected} className='text-primary' />
        </Col>
      </Row>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <ListGroup className="position-absolute w-100 mt-1 bg-light shadow ease-in cursor-pointer">
          {filteredItems.map(item => {
            const hasStock = availability[item._id]; // undefined = unknown (still checking)
            const isUnavailable = hasStock === false;

            return (
              <ListGroup.Item
                key={item._id}
                onClick={() => {
                  if (!isUnavailable) onSelectItem(item);
                }}
                className="cursor-pointer d-flex justify-content-between align-items-center"
                style={isUnavailable ? { pointerEvents: 'none', opacity: 0.5 } : {}}
              >
                <span>
                  {item.name}{' '}
                  <span className="text-muted ml-10" style={{ fontSize: '0.8rem' }}>
                    {" | " + item.description + " | " + item.main_unit_name + " | " + item.other_unit_names.join(', ') + " | " + item.other_parameters.map(param => param.parameter_name + ": " + param.value).join(', ')}
                  </span>
                </span>
                {isUnavailable && <span className="badge bg-secondary">{OUT_OF_STOCK}</span>}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchInput;
