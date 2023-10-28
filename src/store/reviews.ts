import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/reviews';
import { CreateReviewData, Review } from '@/types/reviews';

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([]);
  const loading = ref(false);

  const getReviews = async () => {
    loading.value = true;
    try {
      reviews.value = await api.getReviews();
    } catch (error) {
      message.error('Не удалось загрузить отзывы!');
    } finally {
      loading.value = false;
    }
  };

  const createReview = async (data: CreateReviewData) => {
    loading.value = true;
    try {
      const review = await api.createReview(data);
      reviews.value.push(review);
      message.success('Отзыв успешно отправлен!');
    } catch (error) {
      message.error('Не удалось отправить отзыв!');
    } finally {
      loading.value = false;
    }
  };

  return {
    reviews,
    loading,
    getReviews,
    createReview,
  };
});
