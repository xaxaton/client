<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrganizationsStore } from '@/store/organizations';
import { formatFullName } from '@/utils/format';

const organizationsStore = useOrganizationsStore();

onMounted(async () => {
  await organizationsStore.getEmployees();
});
</script>

<template>
  <a-skeleton v-if="organizationsStore.loading" />

  <a-list
    v-else
    size="small"
    :data-source="organizationsStore.employees"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-descriptions
          :class="$style.descriptions"
          :column="1"
          size="small"
        >
          <a-descriptions-item label="ФИО">{{ formatFullName(item) }}</a-descriptions-item>
          <a-descriptions-item label="Email">{{ item.email }}</a-descriptions-item>
        </a-descriptions>
      </a-list-item>
    </template>
  </a-list>
</template>

<style module lang="scss">
.descriptions {
  width: 100%;
}
</style>
