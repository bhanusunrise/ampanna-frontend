'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateSuperUserToken } from '@/app/api_new/operations/accounts/functions';
import AccountsPage from './accounts_page';
import LoadingSpinner from '../../components/LoadingSpinner/loading_spinner';

export default function Page() {
    const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userInfo = await validateSuperUserToken();
            if (userInfo) {
                setIsValidUser(true);
            } else {
                router.push('/');
            }
        };

        checkAuth();
    }, [router]);

    if (isValidUser === null) {
        return <>
            <LoadingSpinner />
        </>; // Show loading state while validation is in progress
    }

    return isValidUser ? <AccountsPage /> : null;
  }