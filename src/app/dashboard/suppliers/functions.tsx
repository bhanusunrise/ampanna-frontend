import { SUPPLIER_API } from '@/app/constants/constants';

export async function createSupplier(supplierData: {
  supplier_name: string;
  email: string;
  phone: number;
  address: string;
}) {
  try {

    const uri = SUPPLIER_API + 'add_supplier'
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierData),
    });

    if (!response.ok) {
      throw new Error('Failed to create supplier');
    }

    const data = await response.json();
    console.log('Supplier created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
}



export async function loadSuppliers() {

 const uri = SUPPLIER_API + 'load_all_suppliers'
  try {
    const response = await fetch(uri, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }

    const data = await response.json();
    return data.suppliers; // Return only the suppliers array
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return null;
  }
}
