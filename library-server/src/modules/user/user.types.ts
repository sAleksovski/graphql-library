export interface UserInfo {
  id: number;
  name: string;
  avatarUrl: string;
  roles: UserRole[];
}

export interface RegisterUser {
  username: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
