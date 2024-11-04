import { ITEM_CATEGORY_API } from "@/app/constants/constants";

export async function fetchMultipleUnits(unit_ids: string[]): Promise<any> {
    try {
        // Send a POST request to the API
        const response = await fetch(`${ITEM_CATEGORY_API}load_multiple_units`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ unit_ids }), // Send unit_ids array in the request body
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch units');
        }

        // Parse the response JSON
        const data = await response.json();
        return data; // Return the array of units
    } catch (error) {
        console.error("Error fetching multiple units:", error);
        throw error;
    }
}

export async function addItemCategory(categoryName: string, units: string[], default_unit: string) {
    try {
        const response = await fetch(`${ITEM_CATEGORY_API}add_item_category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_name: categoryName,
                units: units,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error adding item category');
        }

        const data = await response.json();
        console.log("Item category added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

