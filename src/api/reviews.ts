import { api } from '@/core/api';
import { CreateReviewData, Review } from '@/types/reviews';

export const getReviews = async () => {
  const { data } = await api.get<Review[]>('/reviews/');
  return data;
};

export const createReview = async (review: CreateReviewData) => {
  const { data } = await api.post<{ review: Review }>('/reviews/', { review });
  return data.review;
};
