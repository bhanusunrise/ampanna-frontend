import crypto from 'crypto';

export function encryptPassword(password: string): string {
    const prefix = 'start123';  // Beginning string
    const suffix = 'end456';    // Ending string
    const combinedPassword = `${prefix}${password}${suffix}`;

    return crypto.createHash('sha256').update(combinedPassword).digest('hex');
}