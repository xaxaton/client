<script lang="ts" setup>
import { useRoute } from 'vue-router';
import TheContainer from '@/components/TheContainer.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute();

const items = {
  nav: [
    {
      label: 'Главная',
      link: '/',
    },
    {
      label: 'Возможности',
      link: '#possibilities',
    },
    {
      label: 'Тарифы',
      link: '#tariffs',
    },
    {
      label: 'Внедрение',
      link: '#integration',
    },
    {
      label: 'Отзывы',
      link: '#reviews',
    },
  ],
  register: [
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
    <a-layout-header :class="$style.header">
      <a-row justify="space-between">
        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            :selected-keys="[route.path]"
          >
            <a-menu-item
              v-for="item in items.nav"
              :key="item.link"
            >
              <a :href="item.link">{{ item.label }}</a>
            </a-menu-item>
          </a-menu>
        </a-col>

        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            :selected-keys="[route.path]"
          >
            <a-menu-item key="/login">
              <router-link to="/login">Вход для зарегистрированных пользователей</router-link>
            </a-menu-item>

            <a-sub-menu title="Регистрация">
              <a-menu-item
                v-for="item in items.register"
                :key="item.link"
              >
                <router-link :to="item.link">{{ item.label }}</router-link>
              </a-menu-item>
            </a-sub-menu>
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

    <TheFooter />
  </a-layout>
</template>

<style module lang="scss">
.layout {
  min-height: 100vh;
}

.header {
  position: fixed;
  z-index: 1000;
  width: 100vw;
}

.content {
  padding-top: 64px;
  margin: 24px 0;
}
</style>
