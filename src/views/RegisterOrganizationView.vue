<script setup lang="ts">
import { reactive } from 'vue';
import { booleanValidator, patterns, repeatPasswordValidator } from '@/utils/validation';

interface FormValues {
  user: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  organization: {
    name: string;
    image: string;
  };
  tariffId: number;
  agreement: boolean;
}

const tariffs = [
  {
    id: 1,
    name: 'Бесплатный',
  },
  {
    id: 3,
    name: 'Минимальный',
  },
  {
    id: 2,
    name: 'Оптимальный',
  },
  {
    id: 4,
    name: 'Полный',
  },
];

const form = reactive<FormValues>({
  user: {
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
  },
  organization: {
    name: '',
    image: '',
  },
  tariffId: 1,
  agreement: false,
});

const onFinish = (values: FormValues) => {
  console.log(values);
};
</script>

<template>
  <a-form
    :model="form"
    autocomplete="off"
    layout="vertical"
    @finish="onFinish"
  >
    <a-form-item
      label="Ваше имя"
      :name="['user', 'name']"
      :rules="[{ required: true, message: 'Пожалуйста введите ваше имя!' }]"
    >
      <a-input v-model:value="form.user.name" />
    </a-form-item>

    <a-form-item
      label="Ваш Email"
      :name="['user', 'email']"
      :rules="[
        { required: true, message: 'Пожалуйста введите ваш Email!' },
        { type: 'email', message: 'Некорректный формат Email!' },
      ]"
    >
      <a-input v-model:value="form.user.email" />
    </a-form-item>

    <a-form-item
      label="Ваш пароль"
      :name="['user', 'password']"
      :rules="[{ required: true, message: 'Пожалуйста введите ваш пароль!' }]"
    >
      <a-input-password v-model:value="form.user.password" />
    </a-form-item>

    <a-form-item
      label="Повторите пароль"
      :name="['user', 'repeatPassword']"
      :rules="[
        { required: true, message: 'Пожалуйста введите ваш пароль!' },
        { validator: repeatPasswordValidator(form.user.password) },
      ]"
    >
      <a-input-password v-model:value="form.user.repeatPassword" />
    </a-form-item>

    <a-form-item
      label="Наименование организации"
      :name="['organization', 'name']"
      :rules="[{ required: true, message: 'Пожалуйста введите наименование организации!' }]"
    >
      <a-input v-model:value="form.organization.name" />
    </a-form-item>

    <a-form-item
      label="Ссылка на логотип"
      :name="['organization', 'image']"
      :rules="[
        { required: true, message: 'Пожалуйста введите ссылку на логотип!' },
        { pattern: patterns.url, message: 'Некорректный формат ссылки!' },
      ]"
    >
      <a-input v-model:value="form.organization.image" />
    </a-form-item>

    <a-form-item
      label="Тариф"
      name="tariffId"
      :rules="[{ required: true, message: 'Пожалуйста выберите тариф!' }]"
    >
      <a-select v-model:value="form.tariffId">
        <a-select-option
          v-for="tariff in tariffs"
          :key="tariff.id"
          :value="tariff.id"
        >
          {{ tariff.name }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      name="agreement"
      :rules="[{ validator: booleanValidator }]"
    >
      <a-checkbox v-model:checked="form.agreement">
        Даю согласие на обработку персональных данных
      </a-checkbox>
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        Отправить
      </a-button>
    </a-form-item>
  </a-form>
</template>
