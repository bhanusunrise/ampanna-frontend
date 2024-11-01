import { UNIT_CATEGORY_API } from "@/app/constants/constants";

export const fetchAllUnitCategories = async () => {

  const uri = UNIT_CATEGORY_API + 'load_unit_categories'
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