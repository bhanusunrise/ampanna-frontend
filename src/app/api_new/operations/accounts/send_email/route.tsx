// app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import transporter from '@/app/utils/nodemailerConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return NextResponse.json(
        { success: false, message: 'To, subject, and text are required.' },
        { status: 400 }
      );
    }

    const info = await transporter.sendMail({
      from: `"Ampanna.com" <${process.env.APP_EMAIL}>`,
      to,
      subject,
      text,
    });

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email. Try again later.' },
      { status: 500 }
    );
  }
}
