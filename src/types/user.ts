import { Role } from './auth';

export interface BaseUser {
  id: number;
  email: string;
  surname: string;
  name: string;
  middle_name: string;
}

export interface User extends BaseUser {
  role: Role;
  token: string;
  organization: {
    id: number;
    name: string;
    logo: string;
    tariff: number;
  } | null;
  department: {
    id: number;
    name: string;
  } | null;
  position: {
    id: number;
    name: string;
  } | null;
}
