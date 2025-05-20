import { NextResponse } from 'next/server';
import { encryptPassword, validatePassword } from '../functions';
import AccountPasswordChange from '@/app/models/account_password_change_model';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, retype } = body;

    console.log(email, password, retype)

    // Basic validation
    if (!email || !password || !retype) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }
    
    if(validatePassword(password) === false) 
        return NextResponse.json({ success: false, message: 'Password does not meet the requirements.' }, { status: 400 });

    if (password !== retype) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match.' },
        { status: 400 }
      );
    }



    const user = await AccountPasswordChange.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    const hashedPassword = encryptPassword(password);
    await AccountPasswordChange.updateOne({ email }, { $set: { password: hashedPassword } });

    return NextResponse.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: 500 }
    );
  }
}
