import { UNIT_CONVERSION_API } from "@/app/constants/constants";

export const fetchAllUnits = async (unitCategoryId: string) => {
  const uri = `${UNIT_CONVERSION_API}load_unit_names?unit_category_id=${unitCategoryId}`;
  
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all units:', error);
    return [];
  }
};


export const fetchAllUnitConversions  = async () => {

  const uri = UNIT_CONVERSION_API + 'load_unit_conversions'
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('Failed to fetch units conversions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all units conversions:', error);
    return [];
  }
};

export const fetchAllUnitCategories  = async () => {

  const uri = UNIT_CONVERSION_API + 'load_unit_categories'
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('Failed to fetch unit categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all unit categories:', error);
    return [];
  }
};

export const addUnitConversion = async (unit_01: string, unit_02: string, multiplier: number) => {
    const uri = UNIT_CONVERSION_API + 'add_unit_conversion';
    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ unitFrom: unit_01, unitTo: unit_02, value: multiplier }), // Make sure the keys are correct
        });

        if (!response.ok) {
            const errorData = await response.json(); // Capture the error message from response
            throw new Error(errorData.message || 'Failed to add unit conversion');
        }

        const data = await response.json();
        return { success: true, message: 'Unit conversion added successfully!' }; // Adjust return data
    } catch (error) {
        console.error('Error adding unit conversion:', error);
        return { success: false, message: error.message }; // Return the error message
    }
};

// New function to update an existing unit conversion
export const updateUnitConversion = async (conversionId: string, newMultiplier: number) => {
  const uri = UNIT_CONVERSION_API + 'update_unit';

  try {
    const response = await fetch(uri, {
      method: 'PUT', // Use PUT to update the unit conversion
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversionId, newMultiplier }), // Pass conversionId and newMultiplier
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update unit conversion');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating unit conversion:', error);
    return { success: false, message: error.message || 'Failed to update unit conversion' };
  }
};


