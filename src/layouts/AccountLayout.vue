<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  ProfileOutlined,
  FundOutlined,
  CommentOutlined,
  ApiOutlined,
} from '@ant-design/icons-vue';
import { useUserStore } from '@/store/user';
import { Role } from '@/types/auth';

const route = useRoute();
const userStore = useUserStore();

const items = computed(() => {
  if (!userStore.user) return [];

  const items = [
    {
      label: 'Профиль',
      link: '/account',
      icon: UserOutlined,
    },
  ];

  if (userStore.user.organization) {
    items.push({
      label: 'Наша компания',
      link: '/account/organization',
      icon: TeamOutlined,
    });

    if (userStore.user.role === Role.User) {
      items.push(
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
      );
    }
  } else {
    items.push({
      label: 'Сканировать QR-код',
      link: '/account/qr',
      icon: ApiOutlined,
    });
  }

  if (userStore.hr) {
    items.push(
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
    );
  }

  return items;
});
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
