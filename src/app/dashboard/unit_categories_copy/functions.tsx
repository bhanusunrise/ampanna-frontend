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

// Function to add a unit
export const addUnitCategory = async (unit_category_name: string, unit_category_type_name: string) => {

  const uri = UNIT_CATEGORY_API + 'add_unit_category'
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_category_name, unit_category_type_name }),
    });

    if (!response.ok) {
      throw new Error('Failed to add unit category');
    }

    await response.json();
    return { success: true, message: 'Unit category added successfully!' }; // Adjust return data
  } catch (error) {
    console.error('Error adding unit category:', error);
    return { success: false, message: 'Failed to add unit category' };
  }
};

//Function to update a unit category
export const updateUnitCategory = async (unit_category_id: string, unit_category_name: string) => {

  const uri = UNIT_CATEGORY_API + 'update_unit_category'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Use PUT to update the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_category_id, unit_category_name}),
    });

    if (!response.ok) {
      throw new Error('Failed to update unit catrgory');
    }

    await response.json();
   return { success: true, message: 'Unit category updated successfully!' };
  } catch (error) {
    console.error('Error updating unit category:', error);
    return { success: false, message: 'Failed to update unit category' };
  }
};

export const deleteUnitCategory = async (unit_category_id: string) => {
  const uri = UNIT_CATEGORY_API + 'delete_unit_category'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Use PUT to update the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_category_id}),
    });

    if (!response.ok) {
      throw new Error('Failed to delete unit category');
    }

    await response.json();
    return { success: true, message: 'Unit category deleted successfully!' };
  } catch (error) {
    console.error('Error delete unit category:', error);
    return { success: false, message: 'Failed to delete unit category' };
  }
};

export const restoreUnitCategory = async (unit_category_id: string) => {

  const uri = UNIT_CATEGORY_API + 'restore_unit_category'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Using PUT to restore the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_category_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to restore unit category');
    }

    await response.json();
    return { success: true, message: 'Unit category restored successfully!' };
  } catch (error) {
    console.error('Error restoring unit category:', error);
    return { success: false, message: 'Failed to restore unit category' };
  }
};