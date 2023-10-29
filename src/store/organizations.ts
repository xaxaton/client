import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message, notification } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/organizations';
import { api as core } from '@/core/api';
import { Department, Position, RegisterOrganizationData } from '@/types/organizations';
import { OrganizationUser } from '@/types/user';
import { useUserStore } from './user';

export const useOrganizationsStore = defineStore('organizations', () => {
  const router = useRouter();
  const userStore = useUserStore();

  const employees = ref<OrganizationUser[]>([]);
  const departments = ref<Department[]>([]);
  const positions = ref<Position[]>([]);
  const qr = ref<string | null>(null);
  const loading = ref(false);
  const departmentsLoading = ref(false);
  const positionsLoading = ref(false);

  const registerOrganization = async (data: RegisterOrganizationData) => {
    loading.value = true;
    try {
      await api.registerOrganization(data);
      notification.success({
        message: 'Вы успешно зарегистрировались!',
        description: 'На ваш Email отправлено письмо для завершения регистрации!',
      });
      router.push('/login');
    } catch (error) {
      message.error('Не удалось выполнить регистрацию!');
    } finally {
      loading.value = false;
    }
  };

  const invite = async (id: number) => {
    loading.value = true;
    try {
      await api.invite(id);
      message.success('На Email сотрудника отправлено письмо с приглашением в организацию!');
    } catch (error) {
      message.error('Не удалось отправить приглашение в организацию!');
    } finally {
      loading.value = false;
    }
  };

  const connect = async (url: string) => {
    try {
      await core.get(url);
      message.success('Вы успешно присоединились к организации!');
      await userStore.auth();
      router.push('/account');
    } catch (error) {
      message.error('Не удалось присоединиться к организации!');
    }
  };

  const getQr = async () => {
    loading.value = true;
    try {
      qr.value = await api.getQr();
    } catch (error) {
      message.error('Не удалось загрузить сотрудников!');
    } finally {
      loading.value = false;
    }
  };

  const getEmployees = async () => {
    loading.value = true;
    try {
      employees.value = await api.getEmployees();
    } catch (error) {
      message.error('Не удалось загрузить сотрудников!');
    } finally {
      loading.value = false;
    }
  };

  const getDepartments = async () => {
    departmentsLoading.value = true;
    try {
      departments.value = await api.getDepartments();
    } catch (error) {
      message.error('Не удалось загрузить отделы!');
    } finally {
      departmentsLoading.value = false;
    }
  };

  const getPositions = async () => {
    positionsLoading.value = true;
    try {
      positions.value = await api.getPositions();
    } catch (error) {
      message.error('Не удалось загрузить должности!');
    } finally {
      positionsLoading.value = false;
    }
  };

  return {
    employees,
    departments,
    positions,
    qr,
    loading,
    departmentsLoading,
    positionsLoading,
    registerOrganization,
    connect,
    invite,
    getQr,
    getEmployees,
    getDepartments,
    getPositions,
  };
});
