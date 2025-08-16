'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/app/api_new/operations/accounts/functions';
import UnitsPage from './units_page';
import LoadingSpinner from '../../components/LoadingSpinner/loading_spinner';

export default function Page() {
    const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userInfo = await validateToken();
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

    return isValidUser ? <UnitsPage /> : null;
  
  }