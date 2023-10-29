<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProfileOutlined } from '@ant-design/icons-vue';
import { useCoursesStore } from '@/store/courses';

const tests = [
  {
    id: 1,
    name: 'Sign',
  },
  {
    id: 2,
    name: 'Air',
  },
  {
    id: 3,
    name: 'Pitch',
  },
  {
    id: 4,
    name: 'Character',
  },
  {
    id: 5,
    name: 'Color',
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
        size="small"
        :data-source="tests"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-row
              :class="$style.row"
              justify="space-between"
            >
              <a-col>
                <ProfileOutlined />
                {{ item.name }}
              </a-col>

              <a-col>
                <router-link
                  style="margin-left: auto"
                  :to="`/account/my-tests/${item.id}`"
                >
                  <a-button type="primary">Пройти тест</a-button>
                </router-link>
              </a-col>
            </a-row>
          </a-list-item>
        </template>
      </a-list>
    </a-collapse-panel>
  </a-collapse>
</template>

<style module lang="scss">
.row {
  flex-wrap: nowrap;
  gap: 24px;
  width: 100%;
}
</style>
