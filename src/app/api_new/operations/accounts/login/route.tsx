import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import LoginAccountModel from '@/app/models/login_account_model';
import crypto from 'crypto';
import { encryptPassword } from '../functions';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, password } = body;

        // Validate request body
        if (!name || !password) {
            return NextResponse.json(
                { success: false, message: 'Username and password are required' },
                { status: 400 }
            );
        }

        const encryptedPassword = encryptPassword(password);

        const user = await LoginAccountModel.findOne({ name: name, password : encryptedPassword });


        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid username or password' },
                { status: 401 }
            );
        }

        // Check if user is allowed
        if (!user.is_allowed) {
            return NextResponse.json(
                { success: false, message: 'User is not allowed to log in' },
                { status: 403 }
            );
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString('hex');

        // Update user record with the new token
        user.token = token;
        await user.save();

        return NextResponse.json(
            { success: true, data: { name: user.name, token: user.token, email: user.email } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error.message },
            { status: 500 }
        );
    }
}