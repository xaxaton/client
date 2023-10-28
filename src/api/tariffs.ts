import { api } from '@/core/api';
import { Tariff } from '@/types/tariffs';

export const getTariffs = async () => {
  const { data } = await api.get<Tariff[]>('/tariffs');
  return data;
};
