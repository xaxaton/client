<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { booleanValidator, repeatPasswordValidator } from '@/utils/validation';

interface FormValues {
  user: {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  agreement: boolean;
}

const userStore = useUserStore();

const form = reactive<FormValues>({
  user: {
    email: '',
    name: '',
    surname: '',
    patronymic: '',
    password: '',
    repeatPassword: '',
  },
  agreement: false,
});

const onFinish = async (values: FormValues) => {
  await userStore.register({
    email: values.user.email,
    name: values.user.name,
    surname: values.user.surname,
    middle_name: values.user.patronymic,
    password: values.user.password,
  });
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
      label="Ваша фамилия"
      :name="['user', 'surname']"
      :rules="[{ required: true, message: 'Пожалуйста введите вашу фамилию!' }]"
    >
      <a-input v-model:value="form.user.surname" />
    </a-form-item>

    <a-form-item
      label="Ваше имя"
      :name="['user', 'name']"
      :rules="[{ required: true, message: 'Пожалуйста введите ваше имя!' }]"
    >
      <a-input v-model:value="form.user.name" />
    </a-form-item>

    <a-form-item
      label="Ваше отчество"
      :name="['user', 'patronymic']"
      :rules="[{ required: true, message: 'Пожалуйста введите ваше отчество!' }]"
    >
      <a-input v-model:value="form.user.patronymic" />
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
      :rules="[
        { required: true, message: 'Пожалуйста введите ваш пароль!' },
        { min: 8, message: 'Пароль должен содержать как минимум 8 символов!' },
      ]"
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
        :loading="userStore.loading"
      >
        Отправить
      </a-button>
    </a-form-item>
  </a-form>
</template>
