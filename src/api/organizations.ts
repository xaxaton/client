import { api } from '@/core/api';
import { AuthResponse } from '@/types/auth';
import { Department, Position, RegisterOrganizationData } from '@/types/organizations';
import { OrganizationUser } from '@/types/user';

export const registerOrganization = async ({ user, organization }: RegisterOrganizationData) => {
  const { data } = await api.post<AuthResponse>('/organizations/register/', {
    user,
    organization,
  });
  return data.user;
};

export const invite = async (id: number) => {
  await api.post('/organizations/invite/', { id });
};

export const getQr = async () => {
  const { data } = await api.get<{ url: string }>('/organizations/qr/');
  return data.url;
};

export const getEmployees = async () => {
  const { data } = await api.get<OrganizationUser[]>('/organizations/employees/');
  return data;
};

export const getDepartments = async () => {
  const { data } = await api.get<Department[]>('/organizations/departments');
  return data;
};

export const getPositions = async () => {
  const { data } = await api.get<Position[]>('/organizations/positions');
  return data;
};
