<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  type TooltipItem,
} from 'chart.js';
import dayjs from 'dayjs';

const props = defineProps<{
  data: {
    id: number;
    test: {
      id: number;
      name: string;
    };
    date: string;
    correct: number;
    all: number;
  }[];
}>();

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const data = computed(() => {
  return {
    labels: props.data.map((result) => new Date(result.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Результаты по всем тестам с течением времени',
        borderColor: '#1677ff',
        data: props.data.map((result) => Math.round((result.correct / result.all) * 100)),
      },
    ],
  };
});

const title = ([item]: TooltipItem<'line'>[]) => {
  const result = props.data[item.dataIndex];
  return dayjs(result.date).format('DD.MM.YYYY hh:mm');
};

const label = (item: TooltipItem<'line'>) => {
  const result = props.data[item.dataIndex];
  return result.test.name;
};

const afterLabel = (item: TooltipItem<'line'>) => {
  return `Результат: ${item.raw}%`;
};
</script>

<template>
  <Line
    :data="data"
    :options="{
      plugins: {
        tooltip: {
          callbacks: {
            title,
            label,
            afterLabel,
          },
        },
      },
    }"
  />
</template>
