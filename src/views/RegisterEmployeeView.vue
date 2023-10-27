<script setup lang="ts">
import { reactive } from 'vue';
import { booleanValidator, repeatPasswordValidator } from '@/utils/validation';

interface FormValues {
  user: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  agreement: boolean;
}

const form = reactive<FormValues>({
  user: {
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
  },
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
