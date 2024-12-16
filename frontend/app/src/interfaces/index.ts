import { IRole } from './data';
export * from './data';

export interface IUser {
    id: number;
    email: string;
    user_info: {
        name: string;
        last_name: string;
        first_name: string;
        name_furi: string;
        last_name_furi: string;
        first_name_furi: string;
        phone: string;
        role: IRole;
        avatar: string,
        profile_text: string
    };
    permission: 'owner' | 'customer' | 'super';
    is_active: boolean;
    is_allowed: boolean;

    created_at?: string;
    updated_at?: string;
}

export interface IArticle {
    cur_step: number;
    id: number;
    image: File;
    title: string;
    content: string;
    category: string;
    price: number;
    nonfree: number;
    created_by: number;
    created_at: string;
}