import dayjs from 'dayjs';

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
