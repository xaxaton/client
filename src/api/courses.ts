import { api } from '@/core/api';
import { Course } from '@/types/courses';

export const getCourses = async () => {
  const { data } = await api.get<Course[]>('/courses/');
  return data;
};
