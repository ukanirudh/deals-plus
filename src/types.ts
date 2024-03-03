export enum AllRoles {
    FULL_ACCESS = 'Full access',
    NO_ACCESS = 'No access',
    BASIC_ACCESS = 'Basic access'
}

export type Structures  = Array<string>;
export type Roles = Array<AllRoles>;

export interface User {
    user: string;
    email: string;
    organisation: string;
}

export type Users = Array<User>;

export interface Entity {
    [key: string]: Array<string>;
}