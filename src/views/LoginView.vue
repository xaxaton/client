<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface FormValues {
  email: string;
  password: string;
}

const form = reactive<FormValues>({
  email: '',
  password: '',
});

const onFinish = (values: FormValues) => {
  console.log(values);

  router.push('/account');
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
      label="Ваш Email"
      name="email"
      :rules="[
        { required: true, message: 'Пожалуйста введите ваш Email!' },
        { type: 'email', message: 'Некорректный формат Email!' },
      ]"
    >
      <a-input v-model:value="form.email" />
    </a-form-item>

    <a-form-item
      label="Ваш пароль"
      name="password"
      :rules="[{ required: true, message: 'Пожалуйста введите ваш пароль!' }]"
    >
      <a-input-password v-model:value="form.password" />
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        Войти
      </a-button>
    </a-form-item>
  </a-form>
</template>
