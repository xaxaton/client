import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/tariffs';
import { Tariff } from '@/types/tariffs';

export const useTariffsStore = defineStore('tariffs', () => {
  const tariffs = ref<Tariff[]>([]);
  const loading = ref(false);

  const getTariffs = async () => {
    loading.value = true;
    try {
      tariffs.value = await api.getTariffs();
    } catch (error) {
      message.error('Не удалось загрузить тарифы');
    } finally {
      loading.value = false;
    }
  };

  return {
    tariffs,
    loading,
    getTariffs,
  };
});
