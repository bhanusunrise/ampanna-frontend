import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import AccountOTP from '@/app/models/account_otp_model';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await AccountOTP.findOne({ email: body.email, is_allowed: true });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        user.otp_code = otpCode;
        await user.save();

        return NextResponse.json(
            { success: true, message: 'OTP generated successfully', otp: otpCode },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error generating OTP:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error },
            { status: 500 }
        );
    }
}