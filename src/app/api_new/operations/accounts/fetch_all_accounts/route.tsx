import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import AccountModel from '@/app/models/account_model';


export async function GET() {
    try {
        await dbConnect();
        const users = await AccountModel.find();

        return NextResponse.json(
            { success: true, data: users },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error },
            { status: 500 }
        );
    }
}