<script setup lang="ts">
import BarChart from '@/components/analytics/BarChart.vue';

const departments = [
  {
    id: 1,
    name: 'Отдел добычи',
    percentage: 89,
  },
  {
    id: 2,
    name: 'Отдел транспортировки',
    percentage: 76,
  },
  {
    id: 3,
    name: 'Отдел реализации',
    percentage: 74,
  },
  {
    id: 4,
    name: 'Отдел безопасности',
    percentage: 67,
  },
];

const positions = [
  {
    id: 1,
    name: 'Инженер по бурению',
    percentage: 87,
  },
  {
    id: 2,
    name: 'Геолог-разведчик',
    percentage: 85,
  },
  {
    id: 3,
    name: 'Техник-геолог',
    percentage: 81,
  },
  {
    id: 4,
    name: 'Машинист буровой установки',
    percentage: 77,
  },
  {
    id: 5,
    name: 'Специалист по обработке и анализу данных',
    percentage: 75,
  },
  {
    id: 6,
    name: 'Инженер-логист',
    percentage: 73,
  },
  {
    id: 7,
    name: 'Диспетчер по координации перевозок',
    percentage: 69,
  },
  {
    id: 8,
    name: 'Менеджер по закупкам и снабжению',
    percentage: 66,
  },
  {
    id: 9,
    name: 'Руководитель специализированной автотранспортной службы',
    percentage: 62,
  },
  {
    id: 10,
    name: 'Специалист по организации перевозок и логистике',
    percentage: 60,
  },
];

const employees = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    percentage: 100,
  },
  {
    id: 2,
    name: 'Петров Петр Петрович',
    percentage: 91,
  },
  {
    id: 3,
    name: 'Алексеев Алексей Алексеевич',
    percentage: 87,
  },
  {
    id: 4,
    name: 'Андреев Сергей Анатольевич',
    percentage: 82,
  },
  {
    id: 5,
    name: 'Петрушкин Станислав Викторович',
    percentage: 75,
  },
  {
    id: 6,
    name: 'Макаров Степан Даниилович',
    percentage: 74,
  },
  {
    id: 7,
    name: 'Алмазова Светлана Константиновна',
    percentage: 68,
  },
  {
    id: 8,
    name: 'Дубенко Владимир Евгеньевич',
    percentage: 63,
  },
  {
    id: 9,
    name: 'Морковина Анастасия Сергеевна',
    percentage: 60,
  },
  {
    id: 10,
    name: 'Зайцева Виктория Викторовна',
    percentage: 55,
  },
];
</script>

<template>
  <a-row :gutter="[24, 24]">
    <a-col :span="24">
      <a-row>
        <a-col :span="16">
          <a-statistic
            title="Лучший отдел"
            :value="departments[0].name"
          />
        </a-col>

        <a-col :span="8">
          <a-statistic
            title="Процент верных ответов"
            :value="`${departments[0].percentage}%`"
          />
        </a-col>
      </a-row>
    </a-col>

    <a-col :span="24">
      <a-row>
        <a-col :span="16">
          <a-statistic
            title="Лучшая должность"
            :value="positions[0].name"
          />
        </a-col>

        <a-col :span="8">
          <a-statistic
            title="Процент верных ответов"
            :value="`${positions[0].percentage}%`"
          />
        </a-col>
      </a-row>
    </a-col>

    <a-col :span="24">
      <a-row>
        <a-col :span="16">
          <a-statistic
            title="Лучший сотрудник"
            :value="employees[0].name"
          />
        </a-col>

        <a-col :span="8">
          <a-statistic
            title="Процент верных ответов"
            :value="`${employees[0].percentage}%`"
          />
        </a-col>
      </a-row>
    </a-col>

    <a-col :span="24">
      <BarChart
        label="Успеваемость отделов"
        :data="departments"
      />
    </a-col>

    <a-col :span="24">
      <BarChart
        label="Успеваемость должностей"
        :data="positions"
      />
    </a-col>

    <a-col :span="24">
      <BarChart
        label="Успеваемость сотрудников"
        :data="employees"
      />
    </a-col>
  </a-row>
</template>
