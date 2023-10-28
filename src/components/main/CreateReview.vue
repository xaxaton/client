<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useReviewsStore } from '@/store/reviews';
import { CreateReviewData } from '@/types/reviews';
import { patterns } from '@/utils/validation';

interface FormValues {
  text: string;
  image: string;
  video: string;
}

const reviewsStore = useReviewsStore();

const open = ref(false);

const form = reactive<FormValues>({
  text: '',
  image: '',
  video: '',
});

const onClose = () => {
  open.value = false;
  form.text = '';
  form.image = '';
  form.video = '';
};

const onFinish = async (values: FormValues) => {
  const data: CreateReviewData = {
    text: values.text,
    image: values.image || undefined,
    video: values.video || undefined,
  };

  await reviewsStore.createReview(data);

  onClose();
};
</script>

<template>
  <a-row justify="center">
    <a-button
      type="primary"
      :loading="reviewsStore.loading"
      @click="open = true"
    >
      Оставить отзыв
    </a-button>
  </a-row>

  <a-modal
    :open="open"
    title="Отзыв"
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
        name="text"
        label="Текст отзыва"
        :rules="[{ required: true, message: 'Пожалуйста введите текст отзыва!' }]"
      >
        <a-textarea
          v-model:value="form.text"
          placeholder="Введите ответ на обращение"
          :rows="4"
        />
      </a-form-item>

      <a-form-item
        name="image"
        label="Ссылка на изображение"
        :rules="[{ pattern: patterns.url, message: 'Некорректный формат ссылки!' }]"
      >
        <a-input v-model:value="form.image" />
      </a-form-item>

      <a-form-item
        name="video"
        label="Ссылка на видео"
        :rules="[{ pattern: patterns.url, message: 'Некорректный формат ссылки!' }]"
      >
        <a-input v-model:value="form.video" />
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
              :loading="reviewsStore.loading"
            >
              Отправить
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
