export interface UserInfo {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface RegisterUser {
  username: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
