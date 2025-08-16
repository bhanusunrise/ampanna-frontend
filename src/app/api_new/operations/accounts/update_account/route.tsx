import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import UpdateAccountModel from '@/app/models/update_account_model';
import { encryptPassword } from '../functions';

export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, password, is_master, is_allowed, ...otherData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch all users who are both allowed and admin
    const adminAccounts = await UpdateAccountModel.find({
      is_master: true,
      is_allowed: true,
    });

    // If there's only one such account and it's the same being updated,
    // ensure you're not turning off is_master or is_allowed
    if (adminAccounts.length === 1) {
      const onlyAdmin = adminAccounts[0];
      const isSameAccount = onlyAdmin._id.toString() === _id;

      // Prevent removing last admin's privilege or access
      if (isSameAccount) {
        // Fetch current values of the account from DB
        const existingAccount = await UpdateAccountModel.findById(_id);
        if (!existingAccount) {
          return NextResponse.json(
            { success: false, message: 'Account not found' },
            { status: 404 }
          );
        }

        // Check if user is trying to revoke admin or allowed status
        const removingAdmin = is_master === false && existingAccount.is_master === true;
        const removingAccess = is_allowed === false && existingAccount.is_allowed === true;

        if (removingAdmin || removingAccess) {
          return NextResponse.json(
            {
              success: false,
              message:
                'Cannot remove admin rights or access from the only active admin account.',
            },
            { status: 400 }
          );
        }
      }
    }

    // Prepare update payload
    const updateData: any = {
      ...otherData,
      is_master,
      is_allowed,
    };

    if (password) {
      updateData.password = encryptPassword(password);
    }

    const updatedUser = await UpdateAccountModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Server error: ' + error },
      { status: 500 }
    );
  }
}
