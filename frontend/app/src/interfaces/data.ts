
export interface IRole {
    id?: number;
    role_id: 'admin' | 'member';
    name: string;
}

export interface IName {
    id: number;
    email: string;
    name: string;
}
