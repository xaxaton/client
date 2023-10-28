<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
  TooltipItem,
} from 'chart.js';

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
  };
}>();

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

const data = computed(() => {
  return {
    labels: ['Количество верных ответов', 'Количество неверных ответов'],
    datasets: [
      {
        label: props.data.test.name,
        backgroundColor: ['#52c41a', '#ff4d4f'],
        data: [props.data.correct, props.data.all - props.data.correct],
      },
    ],
  };
});

const afterLabel = (item: TooltipItem<'pie'>) => {
  return `Результат: ${item.raw}`;
};
</script>

<template>
  <div :class="$style.chart">
    <Pie
      :data="data"
      :options="{
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel,
            },
          },
        },
      }"
    />
  </div>
</template>

<style module lang="scss">
.chart {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
</style>
