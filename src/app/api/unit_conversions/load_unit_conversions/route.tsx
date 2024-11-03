import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';

export async function GET() {
    const connection = await dbConnect();
    
    try {
        const [rows] = await connection.execute(`
            SELECT 
                uc.conversion_id,
                uc.from_unit,
                uc.value,
                uc.to_unit,
                uf.unit_name AS from_unit_name,
                ut.unit_name AS to_unit_name,
                uc.createdAt,
                uc.updatedAt,
                uc.status
            FROM 
                unit_conversions AS uc
            JOIN 
                units AS uf ON uc.from_unit = uf.unit_id
            JOIN 
                units AS ut ON uc.to_unit = ut.unit_id
            ORDER BY 
                uc.conversion_id DESC
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching unit conversions:", error);
        return NextResponse.error();
    } finally {
        await connection.end();
    }
}
