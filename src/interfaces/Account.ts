export interface IUser {
  id: number;
  email: string;
  role: string;
  username: string;
}

export interface IAccount {
  errCode: number;
  message: string;
  role?: string;
  user: IUser;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}
export interface FormLoginValues {
  emailOrUsername: string; // Hỗ trợ cả email hoặc username
  password: string;
}
