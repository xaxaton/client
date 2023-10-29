import dayjs from 'dayjs';
import { BaseUser } from '@/types/user';

export const formatMoney = (money: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(money);
};

export const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YY HH:mm');
};

export const formatFullName = (user: BaseUser) => {
  return `${user.surname} ${user.name} ${user.middle_name}`;
};
