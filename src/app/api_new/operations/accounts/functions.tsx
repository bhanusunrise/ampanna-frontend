import { ACCOUNTS_API } from '@/app/constants/constants';
import crypto from 'crypto';

export function encryptPassword(password: string): string {
    const prefix = 'start123';  // Beginning string
    const suffix = 'end456';    // Ending string
    const combinedPassword = `${prefix}${password}${suffix}`;

    return crypto.createHash('sha256').update(combinedPassword).digest('hex');
}

export async function validateToken() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found in localStorage');
        return null;
    }

    try {
        const response = await fetch(`${ACCOUNTS_API}validate_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        return data.data; // Returns name, is_allowed, and is_master
    } catch (error) {
        console.error('Token validation error:', error);
        return null; // Handle unauthorized or system errors gracefully
    }
}

export async function validateSuperUserToken() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found in localStorage');
        return null;
    }

    try {
        const response = await fetch(`${ACCOUNTS_API}validate_master_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        return data.data; // Returns name, is_allowed, and is_master
    } catch (error) {
        console.error('Token validation error:', error);
        return null; // Handle unauthorized or system errors gracefully
    }
}

export async function distroyToken() {
    localStorage.removeItem('authToken');
}