import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/courses';
import { Course } from '@/types/courses';

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref<Course[]>([]);
  const loading = ref(false);

  const getCourses = async () => {
    loading.value = true;
    try {
      courses.value = await api.getCourses();
    } catch (error) {
      message.error('Не удалось загрузить отзывы!');
    } finally {
      loading.value = false;
    }
  };

  return {
    courses,
    loading,
    getCourses,
  };
});
