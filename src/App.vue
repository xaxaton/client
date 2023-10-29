<script setup lang="ts">
import { onMounted } from 'vue';
import locale from 'ant-design-vue/es/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from './store/user';

dayjs.locale('ru');
dayjs.extend(relativeTime);

const userStore = useUserStore();

onMounted(async () => {
  await userStore.auth();
});
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view v-if="userStore.ready" />

    <div
      v-else
      :class="$style.spin"
    >
      <a-spin size="large" />
    </div>
  </a-config-provider>
</template>

<style module lang="scss">
.spin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding-bottom: 15vh;
}
</style>
