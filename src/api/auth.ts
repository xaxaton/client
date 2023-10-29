import { api } from '@/core/api';
import { AuthResponse, LoginUserData, RegisterUserData } from '@/types/auth';

export const login = async (user: LoginUserData) => {
  const { data } = await api.post<AuthResponse>('/login/', { user });
  return data.user;
};

export const register = async (user: RegisterUserData) => {
  const { data } = await api.post<AuthResponse>('/register/', { user });
  return data.user;
};

export const auth = async () => {
  const { data } = await api.get<AuthResponse>('/auth/');
  return data.user;
};
