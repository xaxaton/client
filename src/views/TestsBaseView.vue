<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue';
import { ProfileOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useCoursesStore } from '@/store/courses';

interface FormValues {
  name: string;
}

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

const activeKey = ref(courses[0].id);
const form = reactive<FormValues>({
  name: '',
});
const open = ref(false);

const onClose = () => {
  open.value = false;
  form.name = '';
};

const onFinish = (values: FormValues) => {
  console.log(values);
};

const onDelete = (id: number) => {
  console.log(id);
};

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
        :class="$style.list"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-row
              justify="space-between"
              align="middle"
              style="width: 100%"
            >
              <router-link :to="`/account/tests-base/${item.id}`">
                <a-space>
                  <ProfileOutlined />
                  {{ item.name }}
                </a-space>
              </router-link>

              <a-popconfirm
                title="Вы действительно хотите удалить тест?"
                cancel-text="Нет"
                ok-text="Да"
                @confirm="onDelete(item.id)"
              >
                <a-button
                  danger
                  size="small"
                  type="primary"
                  :icon="h(DeleteOutlined)"
                  @click.stop
                />
              </a-popconfirm>
            </a-row>
          </a-list-item>
        </template>
      </a-list>

      <a-button
        type="primary"
        @click="open = true"
      >
        Добавить тест
      </a-button>
    </a-collapse-panel>
  </a-collapse>

  <a-modal
    :open="open"
    title="Тест"
    :footer="null"
    @cancel="onClose"
  >
    <a-form
      :model="form"
      layout="vertical"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        name="name"
        label="Название теста"
        :rules="[{ required: true, message: 'Пожалуйста введите название теста!' }]"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>

      <a-form-item style="margin-bottom: -24px">
        <a-row
          justify="end"
          :gutter="8"
        >
          <a-col>
            <a-button @click="onClose">Отмена</a-button>
          </a-col>

          <a-col>
            <a-button
              type="primary"
              html-type="submit"
            >
              Отправить
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style module lang="scss">
.list {
  margin-bottom: 12px;
}
</style>
