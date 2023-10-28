import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message, notification } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/auth';
import { LoginUserData, RegisterUserData } from '@/types/auth';
import { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const loading = ref(false);
  // TODO: update to Boolean(user)
  const authorized = computed(() => true);

  const login = async (data: LoginUserData) => {
    loading.value = true;
    try {
      await api.login(data);
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
      await api.register(data);
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

  const logout = () => {
    user.value = null;
    router.push('/login');
  };

  return {
    user,
    loading,
    authorized,
    login,
    register,
    logout,
  };
});
