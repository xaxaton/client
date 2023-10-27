import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import LoginView from '@/views/LoginView.vue';
import MainView from '@/views/MainView.vue';
import RegisterEmployeeView from '@/views/RegisterEmployeeView.vue';
import RegisterOrganizationView from '@/views/RegisterOrganizationView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          component: MainView,
        },
        {
          path: '/possibilities',
          component: MainView,
        },
        {
          path: '/tariffs',
          component: MainView,
        },
        {
          path: '/integration',
          component: MainView,
        },
        {
          path: '/reviews',
          component: MainView,
        },
        {
          path: '/',
          component: AuthLayout,
          children: [
            {
              path: '/login',
              component: LoginView,
            },
            {
              path: '/register/organization',
              component: RegisterOrganizationView,
            },
            {
              path: '/register/employee',
              component: RegisterEmployeeView,
            },
          ],
        },
      ],
    },
  ],
});
