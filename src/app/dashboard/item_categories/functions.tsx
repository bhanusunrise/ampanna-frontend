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
