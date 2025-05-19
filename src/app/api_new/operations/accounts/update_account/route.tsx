import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UpdateAccountModel from '@/app/models/update_account_model';
import { encryptPassword } from '../functions';

export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { _id, password, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 }
            );
        }

        // Encrypt the new password if provided
        if (password) {
            updateData.password = encryptPassword(password);
        }

        const updatedUser = await UpdateAccountModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedUser },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error },
            { status: 500 }
        );
    }
}
