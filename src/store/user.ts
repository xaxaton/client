import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message, notification } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as authApi from '@/api/auth';
import * as usersApi from '@/api/users';
import { LoginUserData, RegisterUserData, Role } from '@/types/auth';
import { BaseUser, User } from '@/types/user';
import { storage } from '@/utils/storage';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const users = ref<BaseUser[]>([]);
  const loading = ref(false);
  const ready = ref(false);
  const authorized = computed(() => Boolean(user.value));
  const hr = computed(() => {
    if (!user.value) return false;
    return [Role.HR, Role.Admin, Role.SuperUser].includes(user.value.role);
  });

  const login = async (data: LoginUserData) => {
    loading.value = true;
    try {
      user.value = await authApi.login(data);
      storage.set('token', user.value.token);
      message.success('Вы успешно авторизовались!');
      router.push('/account');
    } catch (error) {
      message.error('Не удалось выполнить авторизацию!');
    } finally {
      loading.value = false;
    }
  };

  const register = async (data: RegisterUserData) => {
    loading.value = true;
    try {
      await authApi.register(data);
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

  const auth = async () => {
    if (storage.get('token')) {
      user.value = await authApi.auth();
    }
    ready.value = true;
  };

  const logout = () => {
    user.value = null;
    router.push('/login');
    storage.remove('token');
  };

  const getUsers = async () => {
    loading.value = true;
    try {
      users.value = await usersApi.getUsers();
    } catch (error) {
      message.error('Не удалось загрузить пользователей!');
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    users,
    loading,
    ready,
    authorized,
    hr,
    login,
    register,
    auth,
    logout,
    getUsers,
  };
});
