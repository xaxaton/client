<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FileOutlined } from '@ant-design/icons-vue';
import { patterns } from '@/utils/validation';

interface CourseFormValues {
  name: string;
}

interface MaterialFormValues {
  name: string;
  file: string;
  courseId: number | null;
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
const courseOpen = ref(false);
const materialOpen = ref(false);

const courseForm = reactive<CourseFormValues>({
  name: '',
});

const materialForm = reactive<MaterialFormValues>({
  name: '',
  file: '',
  courseId: null,
});

const onCloseCourse = () => {
  courseOpen.value = false;
  courseForm.name = '';
};

const onCloseMaterial = () => {
  materialOpen.value = false;
  materialForm.name = '';
  materialForm.file = '';
  materialForm.courseId = null;
};

const onOpenMaterial = (courseId: number) => {
  materialOpen.value = true;
  materialForm.courseId = courseId;
};

const onFinishCourse = (values: CourseFormValues) => {
  console.log(values);
};

const onFinishMaterial = (values: MaterialFormValues) => {
  console.log({
    ...values,
    courseId: materialForm.courseId,
  });
};
</script>

<template>
  <a-button
    type="primary"
    :class="$style.action"
    @click="courseOpen = true"
  >
    Добавить курс
  </a-button>

  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel
      v-for="course in courses"
      :key="course.id"
      :header="course.name"
    >
      <a-list
        size="small"
        :data-source="materials"
        :class="$style.list"
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

      <a-button
        type="primary"
        @click="onOpenMaterial(course.id)"
      >
        Добавить учебный материал
      </a-button>
    </a-collapse-panel>
  </a-collapse>

  <a-modal
    :open="courseOpen"
    title="Курс"
    :footer="null"
    @cancel="onCloseCourse"
  >
    <a-form
      :model="courseForm"
      layout="vertical"
      autocomplete="off"
      @finish="onFinishCourse"
    >
      <a-form-item
        name="name"
        label="Название курса"
        :rules="[{ required: true, message: 'Пожалуйста введите название курса!' }]"
      >
        <a-input v-model:value="courseForm.name" />
      </a-form-item>

      <a-form-item style="margin-bottom: -24px">
        <a-row
          justify="end"
          :gutter="8"
        >
          <a-col>
            <a-button @click="onCloseCourse">Отмена</a-button>
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

  <a-modal
    :open="materialOpen"
    title="Курс"
    :footer="null"
    @cancel="onCloseMaterial"
  >
    <a-form
      :model="materialForm"
      layout="vertical"
      autocomplete="off"
      @finish="onFinishMaterial"
    >
      <a-form-item
        name="name"
        label="Название материала"
        :rules="[{ required: true, message: 'Пожалуйста введите название материала!' }]"
      >
        <a-input v-model:value="materialForm.name" />
      </a-form-item>

      <a-form-item
        name="file"
        label="Ссылка на файл"
        :rules="[
          { required: true, message: 'Пожалуйста введите ссылку на файл!' },
          { pattern: patterns.url, message: 'Некорректный формат ссылки!' },
        ]"
      >
        <a-input v-model:value="materialForm.file" />
      </a-form-item>

      <a-form-item style="margin-bottom: -24px">
        <a-row
          justify="end"
          :gutter="8"
        >
          <a-col>
            <a-button @click="onCloseCourse">Отмена</a-button>
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
.action {
  margin-bottom: 24px;
}

.list {
  margin-bottom: 12px;
}
</style>
