import { api } from '@/core/api';
import { Ticket } from '@/types/tickets';

export const getTickets = async () => {
  const { data } = await api.get<Ticket[]>('/tickets/');
  return data;
};

export const createTicket = async (text: string) => {
  const { data } = await api.post<{ ticket: Ticket }>('/tickets/', { text });
  return data.ticket;
};

export const createAnswer = async (id: number, text: string) => {
  await api.post(`/tickets/${id}/answers/`, { text });
};
