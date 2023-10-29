import { api } from '@/core/api';
import { BaseUser } from '@/types/user';

export const getUsers = async () => {
  const { data } = await api.get<BaseUser[]>('/users/');
  return data;
};
