import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; // Adjust the path if necessary

export async function POST(req: Request) {
    const connection = await dbConnect();
    
    try {
        const { category_name, units } = await req.json();

        if (!category_name || !Array.isArray(units) || units.length === 0) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Start a transaction to ensure both inserts succeed together
        await connection.beginTransaction();

        // Query to get the latest category ID and generate the new ID
        const [categoryRows] = await connection.query(`SELECT category_id FROM Item_Categories ORDER BY category_id DESC LIMIT 1`);
        let newCategoryId = 'ICAT01';  // Default starting ID if no records exist

        if (categoryRows.length > 0) {
            const latestId = categoryRows[0].category_id;
            const numericPart = parseInt(latestId.slice(4), 10);
            newCategoryId = `ICAT${(numericPart + 1).toString().padStart(2, '0')}`;
        }

        // Insert into Item_Categories table with the new category ID
        const [categoryResult] = await connection.query(
            `INSERT INTO Item_Categories (category_id, category_name, createdAt, updatedAt)
             VALUES (?, ?, NOW(), NOW())`,
            [newCategoryId, category_name]
        );

        // Query to get the latest ID for ItemCategoryUnit and start numbering
        const [unitRows] = await connection.query(`SELECT id FROM ItemCategoryUnit ORDER BY id DESC LIMIT 1`);
        let unitCounter = 1;

        if (unitRows.length > 0) {
            const latestUnitId = unitRows[0].id;
            const unitNumericPart = parseInt(latestUnitId.slice(6), 10);
            unitCounter = unitNumericPart + 1;
        }

        // Insert related records into ItemCategoryUnit for each unit
        for (const unit_id of units) {
            const newUnitId = `R_ICU${unitCounter.toString().padStart(2, '0')}`;
            await connection.query(
                `INSERT INTO ItemCategoryUnit (id, item_category_id, unit_id, createdAt, updatedAt)
                 VALUES (?, ?, ?, NOW(), NOW())`,
                [newUnitId, newCategoryId, unit_id]
            );
            unitCounter++;
        }

        // Commit the transaction
        await connection.commit();

        return NextResponse.json({ message: "Data inserted successfully", categoryId: newCategoryId });
    } catch (error) {
        // Rollback in case of any error
        await connection.rollback();
        console.error(error);
        return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
    }
}
