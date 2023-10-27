<script lang="ts" setup>
import { useRoute } from 'vue-router';
import TheContainer from '@/components/TheContainer.vue';

const route = useRoute();

const items = {
  left: [
    {
      label: 'Главная',
      link: '/',
    },
    {
      label: 'Возможности',
      link: '/possibilities',
    },
    {
      label: 'Тарифы',
      link: '/tariffs',
    },
    {
      label: 'Внедрение',
      link: '/integration',
    },
    {
      label: 'Отзывы',
      link: '/reviews',
    },
  ],
  right: [
    {
      label: 'Вход для зарегистрированных пользователей',
      link: '/login',
    },
    {
      label: 'Зарегистрировать организацию',
      link: '/register/organization',
    },
    {
      label: 'Зарегистрироваться как сотрудник',
      link: '/register/employee',
    },
  ],
};
</script>

<template>
  <a-layout :class="$style.layout">
    <a-layout-header>
      <a-row justify="space-between">
        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            :selected-keys="[route.path]"
          >
            <a-menu-item
              v-for="item in items.left"
              :key="item.link"
            >
              <router-link :to="item.link">{{ item.label }}</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>

        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            :selected-keys="[route.path]"
          >
            <a-menu-item
              v-for="item in items.right"
              :key="item.link"
            >
              <router-link :to="item.link">{{ item.label }}</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>

    <a-layout-content>
      <TheContainer>
        <div :class="$style.content">
          <router-view />
        </div>
      </TheContainer>
    </a-layout-content>

    <a-layout-footer :class="$style.footer">Профтестиум ©2023</a-layout-footer>
  </a-layout>
</template>

<style module lang="scss">
.layout {
  min-height: 100vh;
}

.content {
  margin: 24px 0;
}

.footer {
  text-align: center;
}
</style>
