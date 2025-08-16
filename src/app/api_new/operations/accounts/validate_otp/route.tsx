import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import AccountOTP from '@/app/models/account_otp_model';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const user = await AccountOTP.findOne({ email, is_allowed: true });

    if (!user || user.otp_code !== parseInt(otp)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("OTP Validation Error:", error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
