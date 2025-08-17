import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import AccountModel from '@/app/models/account_model';
import { encryptPassword, validatePassword } from '../functions';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json(
                { success: false, message: 'Name is required' },
                { status: 400 }
            );
        }

        if(validatePassword(body.password) === false) 
                return NextResponse.json({ success: false, message: 'Password does not meet the requirements.' }, { status: 400 });

        if(body.password !== body.retype_password) {
            return NextResponse.json(
                { success: false, message: 'Passwords do not match' },
                { status: 400 }
            );
        }

        const allUsers = await AccountModel.find({});
        const maxId = allUsers.reduce((max, doc) => {
            const idNum = parseInt(doc._id);
            return idNum > max ? idNum : max;
        }, 0);
        const newId = (maxId + 1).toString();



        const newUser = new AccountModel({
            _id: newId,
            name: body.name,
            email: body.email,
            password: encryptPassword(body.password),
            is_allowed: false,
            is_master: false,
        });

        await newUser.save();

        return NextResponse.json(
            { success: true },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, message: 'Name must be unique' },
                { status: 400 }
            );
        }
        console.error('Error creating user:', error);
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error },
            { status: 500 }
        );
    }
}