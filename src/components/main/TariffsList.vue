<script setup lang="ts">
import { useTariffsStore } from '@/store/tariffs';
import { formatMoney } from '@/utils/format';

const tariffsStore = useTariffsStore();
</script>

<template>
  <a-skeleton v-if="tariffsStore.loading" />

  <a-row
    v-else
    justify="center"
    :gutter="[24, 24]"
  >
    <a-col
      v-for="tariff in tariffsStore.tariffs"
      :key="tariff.id"
      :span="8"
    >
      <a-card :class="$style.card">
        <h3>{{ tariff.name }}</h3>

        <h2>
          <a-typography-text type="success">
            {{ formatMoney(tariff.price) }}
          </a-typography-text>
        </h2>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-statistic
              title="Количество пользователей"
              :value="tariff.users_count"
            />
          </a-col>

          <a-col :span="12">
            <a-statistic
              title="Количество тестов"
              :value="tariff.tests_count"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;
  text-align: center;
}
</style>
