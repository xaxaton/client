import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/tickets';
import { Ticket } from '@/types/tickets';

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([]);
  const loading = ref(false);

  const getTickets = async () => {
    loading.value = true;
    try {
      tickets.value = await api.getTickets();
    } catch (error) {
      message.error('Не удалось загрузить обращения!');
    } finally {
      loading.value = false;
    }
  };

  const createTicket = async (text: string) => {
    loading.value = true;
    try {
      const ticket = await api.createTicket(text);
      tickets.value.push(ticket);
    } catch (error) {
      message.error('Не удалось отправить обращения!');
    } finally {
      loading.value = false;
    }
  };

  const createAnswer = async (id: number, text: string) => {
    loading.value = true;
    try {
      await api.createAnswer(id, text);
      tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
      message.success('Ответ на обращение успешно отправлен!');
    } catch (error) {
      message.error('Не удалось отправить ответ на обращение!');
    } finally {
      loading.value = false;
    }
  };

  return {
    tickets,
    loading,
    getTickets,
    createTicket,
    createAnswer,
  };
});
