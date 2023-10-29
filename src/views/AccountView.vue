<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { Role } from '@/types/auth';
import { formatFullName } from '@/utils/format';

const userStore = useUserStore();

const roles: Record<Role, string> = {
  0: 'Сотрудник',
  1: 'HR',
  2: 'Администратор',
  3: 'Супер-пользователь',
};
</script>

<template>
  <a-space
    v-if="userStore.user"
    direction="vertical"
    size="large"
  >
    <a-statistic
      title="Ваше имя"
      :value="formatFullName(userStore.user)"
    />

    <a-statistic
      title="Ваш Email"
      :value="userStore.user.email"
    />

    <a-statistic
      v-if="userStore.user.department"
      title="Ваш отдел"
      :value="userStore.user.department"
    />

    <a-statistic
      v-if="userStore.user.position"
      title="Ваша должность"
      :value="userStore.user.position"
    />

    <a-statistic
      title="Ваше имя"
      :value="formatFullName(userStore.user)"
    />

    <a-statistic
      title="Роль"
      :value="roles[userStore.user.role]"
    />
  </a-space>
</template>
