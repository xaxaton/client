<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from 'chart.js';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement);

const props = defineProps<{
  label: string;
  data: {
    name: string;
    percentage: number;
  }[];
}>();

const data = computed(() => {
  return {
    labels: props.data.map((item) => item.name),
    datasets: [
      {
        label: props.label,
        data: props.data.map((item) => item.percentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
});
</script>

<template>
  <Bar
    :data="data"
    :options="{
      scales: {
        x: {
          display: false,
        },
      },
    }"
  />
</template>
