import { createRouter, createWebHistory } from 'vue-router';
import AccountLayout from '@/layouts/AccountLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/store/user';
import AccountView from '@/views/AccountView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';
import EmployeesBaseView from '@/views/EmployeesBaseView.vue';
import LoginView from '@/views/LoginView.vue';
import MainView from '@/views/MainView.vue';
import MaterialsBaseView from '@/views/MaterialsBaseView.vue';
import MyEducationView from '@/views/MyEducationView.vue';
import MyRequestsView from '@/views/MyRequestsView.vue';
import MyResultsView from '@/views/MyResultsView.vue';
import MyTestView from '@/views/MyTestView.vue';
import MyTestsView from '@/views/MyTestsView.vue';
import MyTicketsView from '@/views/MyTicketsView.vue';
import OrganizationView from '@/views/OrganizationView.vue';
import RegisterEmployeeView from '@/views/RegisterEmployeeView.vue';
import RegisterOrganizationView from '@/views/RegisterOrganizationView.vue';
import TestBaseView from '@/views/TestBaseView.vue';
import TestsBaseView from '@/views/TestsBaseView.vue';

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
        {
          path: '/account',
          component: AccountLayout,
          meta: { private: true },
          children: [
            {
              path: '/account',
              component: AccountView,
            },
            {
              path: '/account/organization',
              component: OrganizationView,
            },
            {
              path: '/account/my-education',
              component: MyEducationView,
            },
            {
              path: '/account/my-tests',
              component: MyTestsView,
            },
            {
              path: '/account/my-tests/:id',
              component: MyTestView,
            },
            {
              path: '/account/my-results',
              component: MyResultsView,
            },
            {
              path: '/account/my-tickets',
              component: MyTicketsView,
            },
            {
              path: '/account/my-requests',
              component: MyRequestsView,
            },
            {
              path: '/account/materials-base',
              component: MaterialsBaseView,
            },
            {
              path: '/account/tests-base',
              component: TestsBaseView,
            },
            {
              path: '/account/tests-base/:id',
              component: TestBaseView,
            },
            {
              path: '/account/employees-base',
              component: EmployeesBaseView,
            },
            {
              path: '/account/analytics',
              component: AnalyticsView,
            },
          ],
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const store = useUserStore();

  if (to.meta.private && !store.authorized) {
    next('/login');
  } else {
    next();
  }
});
