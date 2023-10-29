<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue';
import { FileOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useCoursesStore } from '@/store/courses';
import { useOrganizationsStore } from '@/store/organizations';
import { useUserStore } from '@/store/user';
import { type CreateCourseData } from '@/types/courses';
import { patterns } from '@/utils/validation';

interface CourseFormValues {
  name: string;
  departmentId: number | null;
  positionId: number | null;
}

interface MaterialFormValues {
  name: string;
  file: string;
  courseId: number | null;
}

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

const userStore = useUserStore();
const coursesStore = useCoursesStore();
const organizationsStore = useOrganizationsStore();

const activeKey = ref<number | null>(null);
const courseOpen = ref(false);
const materialOpen = ref(false);

const courseForm = reactive<CourseFormValues>({
  name: '',
  departmentId: null,
  positionId: null,
});

const materialForm = reactive<MaterialFormValues>({
  name: '',
  file: '',
  courseId: null,
});

const departmentsOptions = computed(() => {
  return organizationsStore.departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));
});

const positionsOptions = computed(() => {
  return organizationsStore.positions.map((position) => ({
    value: position.id,
    label: position.name,
  }));
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

const onFinishCourse = async (values: CourseFormValues) => {
  const data: CreateCourseData = {
    name: values.name,
    organization: { id: Number(userStore.user?.organization?.id) },
    department: values.departmentId ? { id: values.departmentId } : undefined,
    position: values.positionId ? { id: values.positionId } : undefined,
  };

  await coursesStore.createCourse(data);
  onCloseCourse();
};

const onFinishMaterial = (values: MaterialFormValues) => {
  console.log({
    ...values,
    courseId: materialForm.courseId,
  });
};

const onDelete = async (id: number) => {
  await coursesStore.deleteCourse(id);
};

onMounted(async () => {
  await Promise.all([
    coursesStore.getCourses(),
    organizationsStore.getDepartments(),
    organizationsStore.getPositions(),
  ]);
});
</script>

<template>
  <a-button
    type="primary"
    :class="$style.action"
    @click="courseOpen = true"
  >
    Добавить курс
  </a-button>

  <a-skeleton v-if="coursesStore.loading" />

  <a-collapse
    v-else
    v-model:activeKey="activeKey"
  >
    <a-collapse-panel
      v-for="course in coursesStore.courses"
      :key="course.id"
    >
      <template #header>
        <a-row
          justify="space-between"
          align="middle"
        >
          {{ course.name }}

          <a-popconfirm
            title="Вы действительно хотите удалить курс?"
            cancel-text="Нет"
            ok-text="Да"
            @confirm="onDelete(course.id)"
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
      </template>

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

      <a-form-item
        label="Отдел"
        name="departmentId"
      >
        <a-select
          v-model:value="courseForm.departmentId"
          allow-clear
          :options="departmentsOptions"
          :loading="organizationsStore.departmentsLoading"
        />
      </a-form-item>

      <a-form-item
        label="Должность"
        name="positionId"
      >
        <a-select
          v-model:value="courseForm.positionId"
          allow-clear
          :options="positionsOptions"
          :loading="organizationsStore.positionsLoading"
        />
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
              :loading="coursesStore.loading"
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
