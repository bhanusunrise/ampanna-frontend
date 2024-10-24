export const fetchAllUnits = async () => {
  try {
    const response = await fetch('/api/load_units');
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

// Function to add a unit
export const addUnit = async (unit_name: string, abbreviation: string) => {
  try {
    const response = await fetch('/api/add_unit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_name, abbreviation }),
    });

    if (!response.ok) {
      throw new Error('Failed to add unit');
    }

    const data = await response.json();
    return { success: true, message: 'Unit added successfully!' }; // Adjust return data
  } catch (error) {
    console.error('Error adding unit:', error);
    return { success: false, message: 'Failed to add unit' };
  }
};


// New function to update an existing unit
export const updateUnit = async (unit_id: string, unit_name: string, abbreviation: string, status: any) => {
  try {
    const response = await fetch('/api/update_unit', {
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
  try {
    const response = await fetch('/api/delete_unit', {
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
  try {
    const response = await fetch('/api/restore_unit', {
      method: 'PUT', // Use PUT to update the unit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_id}),
    });

    if (!response.ok) {
      throw new Error('Failed to restore unit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error restoring unit:', error);
    return { success: false, message: 'Failed to restore unit' };
  }
};