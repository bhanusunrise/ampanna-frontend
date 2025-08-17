export interface AccountInterface { 

    _id: string;
    name: string;
    email: string;
    password: string;
    retype_password: string;
    is_allowed: boolean;
    is_master: boolean;
    token: string;
    otp_code : number;
} 