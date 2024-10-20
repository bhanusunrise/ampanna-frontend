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
    return data;
  } catch (error) {
    console.error('Error adding unit:', error);
    return { success: false, message: 'Failed to add unit' };
  }
};

// New function to update an existing unit
export const updateUnit = async (unit_id: string, unit_name: string, abbreviation: string) => {
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
