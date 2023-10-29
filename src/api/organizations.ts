import { api } from '@/core/api';
import { AuthResponse } from '@/types/auth';
import { RegisterOrganizationData } from '@/types/organizations';
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
