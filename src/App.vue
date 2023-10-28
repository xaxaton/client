<script setup lang="ts">
import locale from 'ant-design-vue/es/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru');
dayjs.extend(relativeTime);
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
