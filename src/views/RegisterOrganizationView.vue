<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useOrganizationsStore } from '@/store/organizations';
import { useTariffsStore } from '@/store/tariffs';
import { booleanValidator, patterns, repeatPasswordValidator } from '@/utils/validation';

interface FormValues {
  user: {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  organization: {
    name: string;
    logo: string;
  };
  tariffId: number | null;
  agreement: boolean;
}

const organizationsStore = useOrganizationsStore();
const tariffsStore = useTariffsStore();

const form = reactive<FormValues>({
  user: {
    email: '',
    name: '',
    surname: '',
    patronymic: '',
    password: '',
    repeatPassword: '',
  },
  organization: {
    name: '',
    logo: '',
  },
  tariffId: null,
  agreement: false,
});

const onFinish = async (values: FormValues) => {
  await organizationsStore.registerOrganization({
    user: {
      email: values.user.email,
      name: values.user.name,
      surname: values.user.surname,
      middle_name: values.user.patronymic,
      password: values.user.password,
    },
    organization: {
      name: values.organization.name,
      logo: values.organization.logo,
      tariff: {
        id: values.tariffId!,
      },
    },
  });
};

onMounted(async () => {
  await tariffsStore.getTariffs();
});
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
      label="Наименование организации"
      :name="['organization', 'name']"
      :rules="[{ required: true, message: 'Пожалуйста введите наименование организации!' }]"
    >
      <a-input v-model:value="form.organization.name" />
    </a-form-item>

    <a-form-item
      label="Ссылка на логотип"
      :name="['organization', 'logo']"
      :rules="[
        { required: true, message: 'Пожалуйста введите ссылку на логотип!' },
        { pattern: patterns.url, message: 'Некорректный формат ссылки!' },
      ]"
    >
      <a-input v-model:value="form.organization.logo" />
    </a-form-item>

    <a-form-item
      label="Тариф"
      name="tariffId"
      :rules="[{ required: true, message: 'Пожалуйста выберите тариф!' }]"
    >
      <a-select
        v-model:value="form.tariffId"
        :loading="tariffsStore.loading"
      >
        <a-select-option
          v-for="tariff in tariffsStore.tariffs"
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
        :loading="organizationsStore.loading"
      >
        Отправить
      </a-button>
    </a-form-item>
  </a-form>
</template>
