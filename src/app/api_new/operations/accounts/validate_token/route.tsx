import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import LoginAccountModel from '@/app/models/login_account_model';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { token } = body;

        // Validate request body
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token is required' },
                { status: 400 }
            );
        }

        // Find user by token
        const user = await LoginAccountModel.findOne({ token });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

         if (!user || user.is_allowed === false) {
                    return NextResponse.json(
                        { success: false, message: 'Unauthorized' },
                        { status: 402 }
                    );
                }

        return NextResponse.json(
            {
                success: true,
                data: {
                    name: user.name,
                    is_allowed: user.is_allowed,
                    is_master: user.is_master
                }
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error validating token:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error.message },
            { status: 500 }
        );
    }
}