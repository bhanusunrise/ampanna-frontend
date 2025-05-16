'use client';

import React, { useEffect, useState } from 'react';
import { ADD_BUTTON_LABAL, ADD_STOCK, ADD_SUPPLIER, BACK, DELETE_BUTTON_DELETE_MODAL, DELETE_BUTTON_LABAL, DELETE_CONFIRM, DELETE_CONFIRM_MESSEGE, NEW_UNIT_TITLE, NO_RECORDS_FOUND, SEARCH, STOCK_BUYING_PRICE_LABAL, STOCK_BUYING_PRICE_PLACEHOLDER, STOCK_DESCRIPTION_LABAL, STOCK_DESCRIPTION_PLACEHOLDER, STOCK_DISCOUNT_LABAL, STOCK_ITEM_LABAL, STOCK_NAME_LABAL, STOCK_NAME_PLACEHOLDER, STOCK_PURCHASE_DATE_LABAL, STOCK_SEARCH_PLACEHOLDER, STOCK_SELLING_PRICE_LABAL, STOCK_SELLING_PRICE_PLACEHOLDER, STOCK_SUPPLIER_LABAL, STOCK_SUPPLIER_PLACEHOLDER, STOCK_TABLE_FIELDS, STOCK_TOTAL_AMOUNT_LABAL, STOCK_TOTAL_AMOUNT_PLACEHOLDER, STOCKS_API, STOCKS_PAGE_NAME, SUPPLIER_API, UNIT_CATEGORIES_SEARCH_PLACEHOLDER, UNIT_CATEGORY_API, UNIT_CATEGORY_DESCRIPTION_LABAL, UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER, UNIT_CATEGORY_NAME_LABAL, UNIT_CATEGORY_NAME_PLACEHOLDER, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS, UPDATE, UPDATE_BUTTON_LABAL, UPDATE_STOCK_MODEL_TITLE, UPDATE_UNIT_CATEGORY_MODEL_TITLE } from '@/app/constants/constants';
import { Button, Modal, Table } from 'react-bootstrap';
import TextInput from '@/app/components/Forms/text_input';
import StockInterface from '@/app/interfaces/stock_interface';
import { set } from 'mongoose';
import SupplierInterface from '@/app/interfaces/supplier_interface';
import NumberInput from '@/app/components/Forms/number_input';
import ExtraDiscounts from '@/app/components/Forms/stocks/discount_input';

const StocksPage = () => {
  const [stocks, setStocks] = useState<StockInterface[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockInterface[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
  const [selectedStockForAdd , setSelectedStockForAdd] = useState<StockInterface | null>({ discounts: [] } as unknown as StockInterface);
  const [selectedStockForUpdate , setSelectedStockForUpdate] = useState<StockInterface | null>({ discounts: [] } as unknown as StockInterface);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIdSelected, setIsIdSelected] = useState<boolean>(false);
  const [isDescriptionSelected, setIsDescriptionSelected] = useState<boolean>(false);
  const [isNameSelected, setIsNameSelected] = useState<boolean>(false);
  const [isSupplierNameSelected, setIsSupplierNameSelected] = useState<boolean>(false);
  const [isItemNameSelected, setIsItemNameSelected] = useState<boolean>(false);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [isTotalQuantitySelected, setIsTotalQuantitySelected] = useState<boolean>(false);
  const [isSoldQuantitySelected, setIsSoldQuantitySelected] = useState<boolean>(false);
  const [isDamagedQuantitySelected, setIsDamagedQuantitySelected] = useState<boolean>(false);
  const [isBuyingPriceSelected, setIsBuyingPriceSelected] = useState<boolean>(false);
  const [isSellingPriceSelected, setIsSellingPriceSelected] = useState<boolean>(false);
  const [isDiscountSelected, setIsDiscountSelected] = useState<boolean>(false);
  const [isSupplierIdSelected, setIsSupplierIdSelected] = useState<boolean>(false);
  const [isItemIdSelected, setIsItemIdSelected] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDiscountChangeForAdd = (index: number, field: 'start_date' | 'end_date' | 'percentage', newValue: string | number) => {
    if (!selectedStockForAdd) return;

    const updatedDiscounts = [...selectedStockForAdd.discount];
    updatedDiscounts[index] = { ...updatedDiscounts[index], [field]: newValue };

    setSelectedStockForAdd({
        ...selectedStockForAdd,
        discount: updatedDiscounts, // Update the discount array
    });
};

const handleAddDiscountRowForAdd = () => {
    if (!selectedStockForAdd) return;

    setSelectedStockForAdd((prevStock) => ({
      ...prevStock!,
      discount: [...(prevStock?.discount || []), { 
          _id: `${(prevStock?.discount?.length ?? 0) + 1}`, 
          start_date: new Date(), 
          end_date: new Date(), 
          percentage: 0 
      }],
  }));
};

const handleRemoveDiscountRowforUpdate = (index: number) => {
    if (!selectedStockForUpdate) return;

    const updatedDiscounts = selectedStockForUpdate.discount.filter((_, i) => i !== index);

    setSelectedStockForAdd({
        ...selectedStockForUpdate,
        discount: updatedDiscounts,
    });
};


const handleDiscountChangeForUpdate = (index: number, field: 'start_date' | 'end_date' | 'percentage', newValue: string | number) => {
  if (!selectedStockForUpdate) return;

  const updatedDiscounts = [...selectedStockForUpdate.discount];
  updatedDiscounts[index] = { ...updatedDiscounts[index], [field]: newValue };

  setSelectedStockForAdd({
      ...selectedStockForUpdate,
      discount: updatedDiscounts, // Update the discount array
  });
};

const handleAddDiscountRowForUpdate = () => {
  if (!selectedStockForUpdate) return;

  setSelectedStockForUpdate((prevStock) => ({
    ...prevStock!,
    discount: [...(prevStock?.discount || []), { 
        _id: `${(prevStock?.discount?.length ?? 0) + 1}`, 
        start_date: new Date(), 
        end_date: new Date(), 
        percentage: 0 
    }],
}));
};

const handleRemoveDiscountRowForAdd = (index: number) => {
  if (!selectedStockForAdd) return;

  const updatedDiscounts = selectedStockForAdd.discount.filter((_, i) => i !== index);

  setSelectedStockForAdd({
      ...selectedStockForAdd,
      discount: updatedDiscounts,
  });
};



  const fetchStocks = async () => {
      try {
        const response = await fetch(`${STOCKS_API}fetch_all_stocks`);
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }

        const { success, data } = await response.json();
        if (success && Array.isArray(data)) {
          setStocks(data);
          setFilteredStocks(data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
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
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchSelectedStock = async (id: string) => {
    try {
      const response = await fetch(`${STOCKS_API}fetch_all_stocks?_id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock');
      }
      // Since the api returns an array of categories, update the type to UnitCategoryInterface[]
      const { success, data } = await response.json() as {
        success: boolean;
        data: StockInterface[];  // Note the array here
      };

      if (success && data && data.length > 0) {
        setSelectedStockForUpdate(data[0]);
        console.log('Selected Stock:', data[0]);
        setShowUpdateModal(true);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const callUpdateCategoryAPI = async (id: string) => {
    try {
      const response = await fetch(`${STOCKS_API}update_stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: selectedStockForUpdate?.name,
          description: selectedStockForUpdate?.description,
          supplier_id: selectedStockForUpdate?.supplier_id,
          item_id: selectedStockForUpdate?.item_id,
          date: selectedStockForUpdate?.date,
          total_quantity: selectedStockForUpdate?.total_quantity,
          sold_quantity: selectedStockForUpdate?.sold_quantity,
          damaged_quantity: selectedStockForUpdate?.damaged_quantity,
          buying_price: selectedStockForUpdate?.buying_price,
          selling_price: selectedStockForUpdate?.selling_price,
          discount: selectedStockForUpdate?.discount,

        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update stock');
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Updated Stock:', data);
        setShowUpdateModal(false);
        fetchStocks();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating stocks:', error);
    }
  }

  const addStock = async () => {
    try {
      console.log('Selected Stock for Add:', selectedStockForAdd);
      const response = await fetch(`${STOCKS_API}create_stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  
          name: selectedStockForAdd?.name,
          description: selectedStockForAdd?.description,
          supplier_id: selectedStockForAdd?.supplier_id,
          item_id: selectedStockForAdd?.item_id,
          date: selectedStockForAdd?.date,
          total_quantity: selectedStockForAdd?.total_quantity,
          sold_quantity: selectedStockForAdd?.sold_quantity,
          damaged_quantity: selectedStockForAdd?.damaged_quantity,
          buying_price: selectedStockForAdd?.buying_price,
          selling_price: selectedStockForAdd?.selling_price,
          discount: selectedStockForAdd?.discount,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add stock' + response.status + response.text());
      }
      const { success, data } = await response.json();
      if (success && data) {
        console.log('Added Stock:', data);
        fetchStocks();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  }

  const deleteStock = async (id: string) => {
    try {
      const response = await fetch(`${STOCKS_API}delete_stock?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete stock');
      }
      const { success, data } = await response.json();
      fetchStocks();
      if (success && data) {
        console.log('Deleted Stock:', data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  }
        
  useEffect(() => {
    fetchStocks();
    fetchSuppliers();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(stock => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (isIdSelected && stock._id.toLowerCase().includes(searchLower)) ||
          (isNameSelected && stock.name.toLowerCase().includes(searchLower)) ||
          (isDescriptionSelected && stock.description.toLowerCase().includes(searchLower)) ||
          (isSupplierNameSelected && stock.supplier_id.toLowerCase().includes(searchLower)) ||
          (isItemNameSelected && stock.item_id.toLowerCase().includes(searchLower)) ||
          (isDateSelected && new Date(stock.date).toLocaleDateString().includes(searchLower)) ||
          (isTotalQuantitySelected && stock.total_quantity.toString().includes(searchLower)) ||
          (isSoldQuantitySelected && stock.sold_quantity.toString().includes(searchLower)) ||
          (isDamagedQuantitySelected && stock.damaged_quantity.toString().includes(searchLower)) ||
          (isBuyingPriceSelected && stock.buying_price.toString().includes(searchLower)) ||
          (isSellingPriceSelected && stock.selling_price.toString().includes(searchLower)) ||
          (isDiscountSelected && stock.discount.map((d) => `${d._id} (${d.start_date} - ${d.end_date})`).join(', ').toLowerCase().includes(searchLower)) ||
          (isSupplierIdSelected && stock.supplier_id.toLowerCase().includes(searchLower)) ||
          (isItemIdSelected && stock.item_id.toLowerCase().includes(searchLower)) ||


          
          // If no checkboxes are selected, search in all fields
          (!isIdSelected && !isNameSelected && !isDescriptionSelected && !isSupplierNameSelected && !isItemNameSelected && !isDateSelected && (
            stock._id.toLowerCase().includes(searchLower) ||
            stock.name.toLowerCase().includes(searchLower) ||
            stock.description.toLowerCase().includes(searchLower) ||
            stock.supplier_id.toLowerCase().includes(searchLower) ||
            stock.item_id.toLowerCase().includes(searchLower) ||
            new Date(stock.date).toLocaleDateString().includes(searchLower) ||
            stock.total_quantity.toString().includes(searchLower) ||
            stock.sold_quantity.toString().includes(searchLower) ||
            stock.damaged_quantity.toString().includes(searchLower) ||
            stock.buying_price.toString().includes(searchLower) ||
            stock.selling_price.toString().includes(searchLower) ||
            stock.discount.map((d) => `${d._id} (${d.start_date} - ${d.end_date})`).join(', ').toLowerCase().includes(searchLower)
          ))
        );
      });
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks, isIdSelected, isNameSelected, isDescriptionSelected, isSupplierNameSelected, isItemNameSelected, isDateSelected]);

  return (
    <>
     <div className='row'>
      <div className='col-md-8'>
        <h3 className='text-primary'>{STOCKS_PAGE_NAME}</h3>
        <TextInput 
          label={SEARCH} 
          onChangeText={(e) => setSearchQuery(e.target.value)} 
          form_id="search" 
          form_message="" 
          placeholder_text={STOCK_SEARCH_PLACEHOLDER} 
          value={searchQuery}
        />
        <div className="scrollable-table">
        <Table striped bordered hover className='mt-3' size='sm'>
          <thead>
            <tr>
              {STOCK_TABLE_FIELDS.map((field, index) => (
                <th key={index} className='text-primary'>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock._id}</td>
                  <td>{stock.name}</td>
                  <td>{stock.description}</td>
                  <td id={stock.supplier_id}>{stock.supplier_name}</td>
                  <td id={stock.item_id}>{stock.item_name}</td>
                  <td>{new Date(stock.date).toLocaleDateString()}</td>
                  <td>{stock.total_quantity}</td>
                  <td>{stock.sold_quantity}</td>
                  <td>{stock.damaged_quantity}</td>
                  <td>{stock.buying_price}</td>
                  <td>{stock.selling_price}</td>
                  <td>{stock.discount.map((d) => `${d._id} (${d.start_date} - ${d.end_date}) ${d.percentage}`).join(', ')}</td>

                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => fetchSelectedStock(stock._id)}>{UPDATE_BUTTON_LABAL}</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {setShowDeleteModal(true); setSelectedStockId(stock._id)}}>{DELETE_BUTTON_LABAL}</button>
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
          <h3 className='text-primary'>{ADD_STOCK}</h3>

          <TextInput
            form_id="supplier_name"
            onChangeText={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, name: e.target.value })}
            form_message=""
            placeholder_text={STOCK_NAME_PLACEHOLDER}
            label={STOCK_NAME_LABAL}
            value={selectedStockForAdd?.name}
          />

           <TextInput
            form_id="description"
            onChangeText={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, description: e.target.value })}
            form_message=""
            placeholder_text={STOCK_DESCRIPTION_PLACEHOLDER}
            label={STOCK_DESCRIPTION_LABAL}
            value={selectedStockForAdd?.description}
          />

          <label className='text-primary'>{STOCK_SUPPLIER_LABAL}</label>
          <select className='form-select' onChange={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, supplier_id: e.target.value })}>
          <option value="" disabled selected hidden>{STOCK_SUPPLIER_PLACEHOLDER}</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
            ))}
          </select>

          <label className='text-primary'>{STOCK_ITEM_LABAL}</label>
          <select className='form-select' onChange={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, item_id: e.target.value })}>
          <option value="" disabled selected hidden>{STOCK_ITEM_LABAL}</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
            ))}
          </select>

          <label className='text-primary'>{STOCK_PURCHASE_DATE_LABAL}</label>
            <input 
            type="date" 
            className='form-control' 
            title="Select purchase date"
            placeholder="YYYY-MM-DD"
            onChange={(e) => setSelectedStockForAdd({ 
            ...(selectedStockForAdd || {}), 
            date: e.target.value // Store date in YYYY-MM-DD format
            })} 
            value={selectedStockForAdd?.date || ''} 
            />

            <NumberInput
            label={STOCK_TOTAL_AMOUNT_LABAL}
            form_id="total_quantity"
            onChangeText={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, total_quantity: e.target.value })}
            form_message=""
            placeholder_text={STOCK_TOTAL_AMOUNT_PLACEHOLDER}
            value={selectedStockForAdd?.total_quantity}
            />

            <NumberInput
            label={STOCK_BUYING_PRICE_LABAL}
            form_id="buying_price"
            onChangeText={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, buying_price: e.target.value })}
            form_message=""
            placeholder_text={STOCK_BUYING_PRICE_PLACEHOLDER}
            value={selectedStockForAdd?.buying_price}
            />

            <NumberInput
            label={STOCK_SELLING_PRICE_LABAL}
            form_id="selling_price"
            onChangeText={(e) => setSelectedStockForAdd({ ...selectedStockForAdd, selling_price: e.target.value })}
            form_message=""
            placeholder_text={STOCK_SELLING_PRICE_PLACEHOLDER}
            value={selectedStockForAdd?.selling_price}
            />

            <label className='text-primary'>{STOCK_DISCOUNT_LABAL}</label>

            <ExtraDiscounts
              discounts={selectedStockForAdd?.discount ?? []}
              onDiscountChange={handleDiscountChangeForAdd} // Ensure this is correctly passed
              onAddRow={handleAddDiscountRowForAdd}
              onRemoveRow={handleRemoveDiscountRowForAdd}
            />

          <Button variant='success' className='mt-3' onClick={addStock}>
            {ADD_BUTTON_LABAL}
          </Button>

        </div>
      </div>

      {showUpdateModal && selectedStockForUpdate && (

      <Modal show={showUpdateModal}>
        <Modal.Header closeButton onClick={() => setShowUpdateModal(false)}>
          <Modal.Title className='text-primary'>{UPDATE_STOCK_MODEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <TextInput
            form_id="unit_category_name"
            onChangeText={(e) => setSelectedStockForUpdate({ ...selectedStockForUpdate, name: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_NAME_PLACEHOLDER}
            label={UNIT_CATEGORY_NAME_LABAL}
            value={selectedStockForUpdate.name}
          />
          <TextInput
            form_id="description"
            onChangeText={(e) => set({ ...selectedStockForUpdate, description: e.target.value })}
            form_message=""
            placeholder_text={UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER}
            label={UNIT_CATEGORY_DESCRIPTION_LABAL}
            value={setSelectedStockForUpdate.description}
          />

            <ExtraDiscounts
              discounts={selectedStockForUpdate?.discount ?? []}
              onDiscountChange={handleDiscountChangeForUpdate} // Ensure this is correctly passed
              onAddRow={handleAddDiscountRowForUpdate}
              onRemoveRow={handleRemoveDiscountRowforUpdate}
            />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            {BACK}
          </Button>
          <Button variant="primary" onClick={() => {console.log(selectedStockForUpdate._id); callUpdateCategoryAPI(selectedStockForUpdate._id); setShowUpdateModal(false); }}>
            {UPDATE}
          </Button>
        </Modal.Footer>
      </Modal>
      )}

      {showDeleteModal && selectedStockId && (
        
        <Modal show={showDeleteModal}>
          <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
            <Modal.Title className='text-danger'>{DELETE_CONFIRM}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${DELETE_CONFIRM_MESSEGE} ID = ${selectedStockId}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {BACK}
            </Button>
            <Button variant="danger" onClick={() => {deleteStock(selectedStockId); setShowDeleteModal(false); }}>
              {DELETE_BUTTON_DELETE_MODAL}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default StocksPage;