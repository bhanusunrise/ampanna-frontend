import { UNIT_API, UNIT_CATEGORY_API } from "@/app/constants/constants";

export const fetchAllUnits = async () => {

  const uri = UNIT_API + 'load_units'
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
export const addUnit = async (unit_name: string, abbreviation: string, unit_category_id: string) => {

  const uri = UNIT_API + 'add_unit'
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_name, abbreviation, unit_category_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to add unit');
    }

    await response.json();
    return { success: true, message: 'Unit added successfully!' }; // Adjust return data
  } catch (error) {
    console.error('Error adding unit:', error);
    return { success: false, message: 'Failed to add unit' };
  }
};


// New function to update an existing unit
export const updateUnit = async (unit_id: string, unit_name: string, abbreviation: string) => {

  const uri = UNIT_API + 'update_unit'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Use PUT to update the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_id, unit_name, abbreviation }),
    });

    if (!response.ok) {
      throw new Error('Failed to update unit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating unit:', error);
    return { success: false, message: 'Failed to update unit' };
  }
};

export const blankFunction = () =>{
  console.log('Function is blanked');
}

export const deleteUnit = async (unit_id: string) => {
  const uri = UNIT_API + 'delete_unit'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Use PUT to update the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_id}),
    });

    if (!response.ok) {
      throw new Error('Failed to delete unit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error delete unit:', error);
    return { success: false, message: 'Failed to delete unit' };
  }
};

export const RestoreUnit = async (unit_id: string) => {

  const uri = UNIT_API + 'restore_unit'
  try {
    const response = await fetch(uri, {
      method: 'PUT', // Using PUT to restore the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to restore unit');
    }

    await response.json();
    return { success: true, message: 'Unit restored successfully!' };
  } catch (error) {
    console.error('Error restoring unit:', error);
    return { success: false, message: 'Failed to restore unit' };
  }
};
