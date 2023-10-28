<script setup lang="ts">
import { onMounted } from 'vue';
import { DollarOutlined } from '@ant-design/icons-vue';
import CreateReview from '@/components/main/CreateReview.vue';
import IntegrationInfo from '@/components/main/IntegrationInfo.vue';
import MainInfo from '@/components/main/MainInfo.vue';
import PossibilitiesInfo from '@/components/main/PossibilitiesInfo.vue';
import ReviewsCarousel from '@/components/main/ReviewsCarousel.vue';
import TariffsList from '@/components/main/TariffsList.vue';
import { useReviewsStore } from '@/store/reviews';
import { useTariffsStore } from '@/store/tariffs';

const tariffsStore = useTariffsStore();
const reviewsStore = useReviewsStore();

onMounted(async () => {
  await Promise.all([tariffsStore.getTariffs(), reviewsStore.getReviews()]);
});
</script>

<template>
  <a-space
    direction="vertical"
    size="large"
    :class="$style.main"
  >
    <a-card>
      <MainInfo />
    </a-card>

    <a-card id="possibilities">
      <PossibilitiesInfo />
    </a-card>

    <a-card id="tariffs">
      <h2>Тарифы</h2>

      <h3><DollarOutlined /> Выберите подходящий тариф</h3>

      <p>
        <strong>Профтестиум</strong> предлагает гибкие тарифы, которые соответствуют потребностям
        вашей компании. Мы предлагаем следующие варианты:
      </p>

      <TariffsList />
    </a-card>

    <a-card id="integration">
      <IntegrationInfo />
    </a-card>

    <a-card id="reviews">
      <h2>Отзывы</h2>

      <h3>Отзывы наших клиентов</h3>

      <p>
        Наши клиенты довольны результатами, которые они достигают с помощью
        <strong>Профтестиум</strong>. Вот что они говорят:
      </p>

      <ReviewsCarousel />

      <CreateReview />
    </a-card>
  </a-space>
</template>

<style module lang="scss">
.main {
  h2 {
    margin-bottom: 24px;
  }
}
</style>
