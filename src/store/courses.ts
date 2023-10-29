import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import * as api from '@/api/courses';
import { Course, CreateCourseData } from '@/types/courses';

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

  const createCourse = async (data: CreateCourseData) => {
    loading.value = true;
    try {
      const course = await api.createCourse(data);
      courses.value.push(course);
      message.success('Курс успешно создан!');
    } catch (error) {
      message.error('Не удалось создать курс!');
    } finally {
      loading.value = false;
    }
  };

  const deleteCourse = async (id: number) => {
    loading.value = true;
    try {
      await api.deleteCourse(id);
      courses.value = courses.value.filter((course) => course.id !== id);
      message.success('Курс успешно удален!');
    } catch (error) {
      message.error('Не удалось создать курс!');
    } finally {
      loading.value = false;
    }
  };

  return {
    courses,
    loading,
    getCourses,
    createCourse,
    deleteCourse,
  };
});
