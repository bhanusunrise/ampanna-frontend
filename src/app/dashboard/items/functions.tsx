// Fetch all active item categories

import { ITEMS_API } from "@/app/constants/constants";

export async function fetchActiveItemCategories() {
  try {
    const uri = ITEMS_API + 'load_all_item_categories'
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch item categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item categories:', error);
    return null;
  }
}

// Fetch all active Unit Categories

export async function fetchActiveUnitCategories() {
  try {

    const uri = ITEMS_API + 'load_all_unit_categories'
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unit categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching unit categories:', error);
    return null;
  }
}

// Fetch Units By catregory

export async function fetchUnitsByCategory(unit_category_id: string) {
  try {

    const uri = ITEMS_API + 'load_all_units'
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_category_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching units by category:', error);
    return null;
  }
}


// Fetch all active items and units

export async function fetchItemsWithUnits() {
  try {

    const uri = ITEMS_API + "load_all_items"
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch items with units');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items with units:', error);
    return null;
  }
}


// Add items and units

export async function addItemWithUnits(item_category_id: string, item_name: string, units: Array<{ unit_id: string; default_status?: string }>) {
  try {

    const uri = ITEMS_API + "add_item"
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_category_id, item_name, units }),
    });

    if (!response.ok) {
      throw new Error('Failed to add item and units');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item and units:', error);
    return null;
  }
}



// Update items and units

export async function updateItemAndDefaultUnit(item_id: string, item_name: string, default_unit_id?: string) {
  try {

    const uri = ITEMS_API + "update_item"
    const response = await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id, item_name, default_unit_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to update item and default unit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating item and default unit:', error);
    return null;
  }
}


// Delete items and units

export async function deleteIteam(item_id: string) {
  try {

    const uri = ITEMS_API + "delete_item"
    const response = await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to mark item as inactive');
    }

    const data = await response.json();
    return {success: true, message: data.message};
  } catch (error) {
    console.error('Error marking item as inactive:', error);
    return null;
  }
}


// Restore item and unit

export async function restoreItem(item_id: string) {
  try {
    const uri = ITEMS_API + "restore_item"
    const response = await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to restore item');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error restoring item:', error);
    return null;
  }
}
