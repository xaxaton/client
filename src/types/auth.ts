export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData extends LoginUserData {
  name: string;
  surname: string;
  middle_name: string;
}

export enum Role {
  User,
  HR,
  Admin,
  SuperUser,
}
