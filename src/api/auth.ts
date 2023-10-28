import { api } from '@/core/api';
import { LoginUserData, RegisterUserData } from '@/types/auth';

export const login = async (user: LoginUserData) => {
  const { data } = await api.post('/login/', { user });
  return data;
};

export const register = async (user: RegisterUserData) => {
  const { data } = await api.post('/register/', { user });
  return data;
};
