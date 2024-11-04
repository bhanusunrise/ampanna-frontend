import { ITEM_CATEGORY_API } from "@/app/constants/constants";

export const insertItemCategory = async (itemCategoryName: string) => {
    try {
        const uri = ITEM_CATEGORY_API + 'add_item_category';
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_category_name: itemCategoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to insert item category');
        }

        const data = await response.json();
        return data; // returns success message and category_id if successful
    } catch (error) {
        console.error('Error inserting item category:', error);
        throw error;
    }
};


export const loadAllItemCategories = async () => {
    try {
        const uri = ITEM_CATEGORY_API + 'load_all_item_categories';
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to load item categories');
        }

        const data = await response.json();
        return data; // returns the list of item categories
    } catch (error) {
        console.error('Error loading item categories:', error);
        throw error;
    }
};

export const updateItemCategory = async (categoryId: string, categoryName: string) => {
    try {
        const uri = ITEM_CATEGORY_API + 'update_item_category';
        const response = await fetch(uri, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_id: categoryId, category_name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to update item category');
        }

        const data = await response.json();
        return data; // returns success message if successful
    } catch (error) {
        console.error('Error updating item category:', error);
        throw error;
    }
};


export const deleteItemCategory = async (item_category_id: string) => {
    try {
        const response = await fetch(`${ITEM_CATEGORY_API}delete_item_category`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_category_id }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { success: false, message: errorResponse.message };
        }

        const result = await response.json();
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Error deleting item category:', error);
        return { success: false, message: 'Failed to delete item category' };
    }
};


export const restoreItemCategory = async (item_category_id: string) => {
    try {
        const response = await fetch(`${ITEM_CATEGORY_API}restore_item_category`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_category_id }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { success: false, message: errorResponse.message };
        }

        const result = await response.json();
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Error restoring item category:', error);
        return { success: false, message: 'Failed to restore item category' };
    }
};
