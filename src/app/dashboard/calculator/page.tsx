'use client';

import SearchInput from "@/app/components/Forms/calculator/search_input";
import TextInput from "@/app/components/Forms/text_input";
import { CALCULATOR_PAGE_NAME, ITEMS_API, ITEMS_PAGE_NAME, ITEMS_SEARCH_PLACEHOLDER, SEARCH } from "@/app/constants/constants";
import ItemInterface from "@/app/interfaces/item_interface";
import { set } from "mongoose";
import { useEffect, useState } from "react";



function CalculatorPage() {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isOtherParametersSelected, setIsOtherParametersSelected] = useState<boolean>(false);
  const [isMainUnitNameSelected, setIsMainUnitNameSelected] = useState<boolean>(false);
  const [isOtherUnitNamesSelected, setIsOtherUnitNamesSelected] = useState<boolean>(false);

  const fetchItems = async () => {
      try {
        const response = await fetch(`${ITEMS_API}fetch_all_items`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
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
      }

      useEffect(() => {
        fetchItems();
      }, []);

    
      
  
  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h3 className='text-primary'>{CALCULATOR_PAGE_NAME}</h3>
        
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <SearchInput
            label={SEARCH}
            form_id="search"
            placeholder_text={ITEMS_SEARCH_PLACEHOLDER}
            onSelectItem={setSelectedItem}
          />
        </div>
      </div>
    </div>
    
    </>
  );
}

export default CalculatorPage;