export const fetchAllUnits = async () => {
  try {
    const response = await fetch('/api/load_units'); // Make sure this path is correct
    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }
    const data = await response.json();
    return data; // Returning the full list of units
  } catch (error) {
    console.error('Error fetching all units:', error);
    return [];
  }
};
