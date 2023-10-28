<script setup lang="ts">
const employees = Array.from({ length: 10 }).map(() => ({
  id: 1,
  email: 'ivanov.ivan@mail.ru',
  name: 'Иванов Иван Иванович',
  department: 'Слесарный',
  position: 'Слесарь',
}));
</script>

<template>
  <a-list
    size="small"
    :data-source="employees"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-descriptions
          :class="$style.descriptions"
          :column="1"
          size="small"
          bordered
        >
          <a-descriptions-item label="ФИО">{{ item.name }}</a-descriptions-item>
          <a-descriptions-item label="Email">{{ item.email }}</a-descriptions-item>
          <a-descriptions-item label="Отдел">{{ item.department }}</a-descriptions-item>
          <a-descriptions-item label="Должность">{{ item.position }}</a-descriptions-item>
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
