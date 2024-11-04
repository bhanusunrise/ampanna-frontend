import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function GET() {
    const connection = await dbConnect();

    try {
        // Query to fetch all item categories along with their units and default statuses
        const query = `
            SELECT 
                ic.category_id AS item_category_id,
                ic.category_name AS item_category_name,
                icu.unit_id AS unit_id,
                u.unit_name AS unit_name,
                icu.default_status AS default_status
            FROM Item_Categories ic
            LEFT JOIN ItemCategoryUnit icu ON ic.category_id = icu.item_category_id
            LEFT JOIN Units u ON icu.unit_id = u.unit_id
            ORDER BY ic.category_id
        `;

        const [results] = await connection.query(query);

        // Transform the flat results into a nested structure
        const categoriesMap = new Map();

        results.forEach(item => {
            const { item_category_id, item_category_name, unit_id, unit_name, default_status } = item;

            // Check if the category already exists in the map
            if (!categoriesMap.has(item_category_id)) {
                categoriesMap.set(item_category_id, {
                    item_category_id,
                    item_category_name,
                    units: []
                });
            }

            // Push the unit information into the corresponding category
            categoriesMap.get(item_category_id).units.push({
                unit_id,
                unit_name,
                default_status
            });
        });

        // Convert the map to an array
        const categoriesArray = Array.from(categoriesMap.values());

        return NextResponse.json(categoriesArray);
    } catch (error) {
        console.error("Error fetching item categories:", error);
        return NextResponse.json({ error: "Error fetching item categories" }, { status: 500 });
    } finally {
        // Close the connection
        await connection.end(); // use end() to close the connection
    }
}
