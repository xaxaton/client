import { Role } from './auth';
import { Department, Position } from './organizations';

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
  department: Department | null;
  position: Position | null;
}

export interface User extends OrganizationUser {
  role: Role;
  token: string;
}
