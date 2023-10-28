<script lang="ts" setup>
import { useRoute } from 'vue-router';
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  ProfileOutlined,
  FundOutlined,
  CommentOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();

const items = [
  {
    label: 'Профиль',
    link: '/account',
    icon: UserOutlined,
  },
  {
    label: 'Наша компания',
    link: '/account/organization',
    icon: TeamOutlined,
  },
  {
    label: 'Мое обучение',
    link: '/account/my-education',
    icon: FileOutlined,
  },
  {
    label: 'Мои тесты',
    link: '/account/my-tests',
    icon: ProfileOutlined,
  },
  {
    label: 'Мои результаты',
    link: '/account/my-results',
    icon: FundOutlined,
  },
  {
    label: 'Мои обращения',
    link: '/account/my-tickets',
    icon: CommentOutlined,
  },
  {
    label: 'Мои заявки',
    link: '/account/my-requests',
    icon: CommentOutlined,
  },
  {
    label: 'База учебных материалов',
    link: '/account/materials-base',
    icon: FileOutlined,
  },
  {
    label: 'База тестов',
    link: '/account/tests-base',
    icon: ProfileOutlined,
  },
  {
    label: 'База сотрудников',
    link: '/account/employees-base',
    icon: TeamOutlined,
  },
  {
    label: 'Аналитика',
    link: '/account/analytics',
    icon: FundOutlined,
  },
];
</script>

<template>
  <a-card>
    <a-layout>
      <a-layout-sider
        theme="dark"
        width="230px"
      >
        <a-menu
          theme="dark"
          :selected-keys="[route.path]"
        >
          <a-menu-item
            v-for="item in items"
            :key="item.link"
          >
            <router-link :to="item.link">
              <a-space>
                <component :is="item.icon" />
                {{ item.label }}
              </a-space>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout-content :class="$style.content">
        <a-card>
          <router-view />
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>

<style module lang="scss">
.content {
  padding: 24px;
}
</style>
