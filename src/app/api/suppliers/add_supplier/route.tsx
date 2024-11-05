import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db'; 

export async function POST(req: Request) {
    const connection = await dbConnect();
    
    try {
        const { supplier_name, email, phone, address } = await req.json();

        // Validate that required fields are provided
        if (!supplier_name || !email || !phone || !address) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Fetch the latest supplier ID to generate the next one
        const [latestSupplier] = await connection.query(`
            SELECT supplier_id 
            FROM Suppliers 
            ORDER BY supplier_id DESC 
            LIMIT 1
        `);

        let newSupplierId = 'SUP01'; // Default value
        if (latestSupplier && latestSupplier.length > 0) {
            const lastSupplierId = latestSupplier[0].supplier_id;
            const lastIdNumber = parseInt(lastSupplierId.replace('SUP', ''), 10);
            const newIdNumber = lastIdNumber + 1;
            newSupplierId = `SUP${newIdNumber.toString().padStart(2, '0')}`; // e.g., SUP02, SUP03, etc.
        }

        // Insert data into Suppliers table
        await connection.execute(`
            INSERT INTO Suppliers (supplier_id, supplier_name, email, phone, address, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `, [newSupplierId, supplier_name, email, phone, address]);

        return NextResponse.json({ supplier_id: newSupplierId, supplier_name, email, phone, address }, { status: 201 });
    } catch (error) {
        console.error("Error inserting supplier:", error);
        return NextResponse.json({ error: "Failed to insert supplier" }, { status: 500 });
    } finally {
        await connection.end();
    }
}
