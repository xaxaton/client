import { Role } from './auth';

export interface BaseUser {
  id: number;
  email: string;
  surname: string;
  name: string;
  middle_name: string;
}

export interface OrganizationUser extends BaseUser {
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

export interface User extends OrganizationUser {
  role: Role;
  token: string;
}
