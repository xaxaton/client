<script setup lang="ts">
import { ref } from 'vue';
import { FileOutlined } from '@ant-design/icons-vue';

const courses = [
  {
    id: 1,
    name: 'Beside tune cowboy discovery noun should ready shallow hungry',
  },
  {
    id: 2,
    name: 'Scientific brain sharp plate alphabet upper habit queen physical',
  },
  {
    id: 3,
    name: 'Radio rapidly period shall forget apart gave climate printed remarkable',
  },
  {
    id: 4,
    name: 'Standard believed wherever pair look large only ahead prove wood blew',
  },
  {
    id: 5,
    name: 'Sit road vote twelve day end facing hot party silent poet speed visit ',
  },
];

const materials = [
  {
    id: 1,
    name: 'Sign',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 2,
    name: 'Air',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 3,
    name: 'Pitch',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 4,
    name: 'Character',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 5,
    name: 'Color',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

const activeKey = ref(courses[0].id);
</script>

<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel
      v-for="course in courses"
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
