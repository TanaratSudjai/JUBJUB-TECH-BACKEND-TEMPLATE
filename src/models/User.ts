export interface User {
    user_id?: number; // Optional for creation, auto incremented by DB
    role_id?: number | null;
    user_name: string;
    user_email: string;
    user_password?: string; // Optional for response
    user_phone?: string;
    user_age?: number;
    user_avatar?: string;
    user_status?: number;
    created_at?: Date;
    created_by?: number;
    updated_at?: Date | null;
    updated_by?: number;
    deleted_at?: Date | null;
    deleted_by?: number;
}

export interface UserWithRole extends User {
    role_name: string;
    role_description?: string;
}
