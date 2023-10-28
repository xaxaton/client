<script setup lang="ts">
import { ref } from 'vue';
import LineChart from '@/components/results/charts/LineChart.vue';
import PieChart from '@/components/results/charts/PieChart.vue';

const data = [
  {
    id: 1,
    test: {
      id: 1,
      name: 'belt port anyway hair important back replace forest sick secret',
    },
    date: '2023-10-28T09:08:53.716Z',
    correct: 5,
    all: 10,
  },
  {
    id: 2,
    test: {
      id: 2,
      name: 'ability label hold hardly fact dozen avoid substance cloth anyone unusual how bill',
    },
    date: '2023-10-28T09:09:53.716Z',
    correct: 7,
    all: 10,
  },
  {
    id: 3,
    test: {
      id: 3,
      name: 'jungle airplane coming deal tent arrow load settle eye across form',
    },
    date: '2023-10-28T09:10:53.716Z',
    correct: 3,
    all: 10,
  },
  {
    id: 4,
    test: {
      id: 4,
      name: 'interior force herself left remarkable some plural box coat flat',
    },
    date: '2023-10-28T09:11:53.716Z',
    correct: 10,
    all: 10,
  },
];

const activeKey = ref([data[0].id]);
</script>

<template>
  <LineChart :data="data" />

  <a-divider />

  <!-- <a-list :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <PieChart :data="item" />
      </a-list-item>
    </template>
  </a-list> -->

  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel
      v-for="item in data"
      :key="item.id"
      :header="item.test.name"
    >
      <PieChart :data="item" />
    </a-collapse-panel>
  </a-collapse>
</template>
