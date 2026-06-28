export interface User {
    user_id?: number;
    user_name: string;
    user_email: string;
    user_password?: string;
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
