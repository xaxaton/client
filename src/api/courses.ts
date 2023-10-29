import { api } from '@/core/api';
import { Course, CreateCourseData } from '@/types/courses';

export const getCourses = async () => {
  const { data } = await api.get<Course[]>('/courses/');
  return data;
};

export const createCourse = async (course: CreateCourseData) => {
  const { data } = await api.post<Course>('/courses/', course);
  return data;
};

export const deleteCourse = async (id: number) => {
  await api.delete(`/courses/${id}/`);
};
