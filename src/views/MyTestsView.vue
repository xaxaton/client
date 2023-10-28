<script setup lang="ts">
import { ref } from 'vue';
import { ProfileOutlined } from '@ant-design/icons-vue';

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
        size="small"
        :data-source="courses"
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
                  to="/account/my-tests/1"
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
