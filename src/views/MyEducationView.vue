<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FileOutlined } from '@ant-design/icons-vue';
import { useCoursesStore } from '@/store/courses';

const materials = [
  {
    id: 1,
    name: 'Sign',
    link: 'http://www.osu.ru/doc/2593',
  },
  {
    id: 2,
    name: 'Air',
    link: 'http://www.osu.ru/doc/2593',
  },
  {
    id: 3,
    name: 'Pitch',
    link: 'http://www.osu.ru/doc/2593',
  },
  {
    id: 4,
    name: 'Character',
    link: 'http://www.osu.ru/doc/2593',
  },
  {
    id: 5,
    name: 'Color',
    link: 'http://www.osu.ru/doc/2593',
  },
];

const coursesStore = useCoursesStore();

const activeKey = ref<number | null>(null);

onMounted(async () => {
  await coursesStore.getCourses();
});
</script>

<template>
  <a-skeleton v-if="coursesStore.loading" />

  <a-collapse
    v-else
    v-model:activeKey="activeKey"
  >
    <a-collapse-panel
      v-for="course in coursesStore.courses"
      :key="course.id"
      :header="course.name"
    >
      <a-list
        :data-source="materials"
        size="small"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a
              :href="item.link"
              target="_blank"
            >
              <a-space>
                <FileOutlined />
                {{ item.name }}
              </a-space>
            </a>
          </a-list-item>
        </template>
      </a-list>
    </a-collapse-panel>
  </a-collapse>
</template>
