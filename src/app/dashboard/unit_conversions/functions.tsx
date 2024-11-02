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