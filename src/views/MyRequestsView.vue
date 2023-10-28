<script setup lang="ts">
import { ref, reactive } from 'vue';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

interface FormValues {
  text: string;
}

const tickets = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Иванов Иван Иванович',
    },
    text: 'tin office newspaper chain planned foot game cheese garage fur act thee enough day stretch hunt shoe wooden experiment harder silence nuts to join',
  },
  {
    id: 2,
    user: {
      id: 1,
      name: 'Иванов Иван Иванович',
    },
    text: 'name center character due view wash they snake enough serious third talk soft attempt eleven number summer powder floor worth wall walk jar hurried',
  },
  {
    id: 3,
    user: {
      id: 1,
      name: 'Иванов Иван Иванович',
    },
    text: 'worker football river taken sang scientist finally exercise news sister special husband most dinner percent break drink visit solution while expect science mad merely',
  },
  {
    id: 4,
    user: {
      id: 1,
      name: 'Иванов Иван Иванович',
    },
    text: 'law act attempt fuel major size master noise education compass charge store test alive instead sand review trace world long energy bicycle laid moving',
  },
  {
    id: 5,
    user: {
      id: 1,
      name: 'Иванов Иван Иванович',
    },
    text: 'understanding then east mental buffalo according begun bone service bear due space halfway prepare nation contrast pair belt unhappy pet fog hall cotton society',
  },
];

const form = reactive<FormValues>({
  text: '',
});
const ticket = ref<(typeof tickets)[number] | null>(null);

const onOpen = (value: (typeof tickets)[number]) => {
  ticket.value = value;
};

const onClose = () => {
  ticket.value = null;
  form.text = '';
};

const onFinish = (values: FormValues) => {
  console.log(values);
  message.success('Ответ успешно отправлен!');
  onClose();
};
</script>

<template>
  <a-list
    size="small"
    :data-source="tickets"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-space direction="vertical">
          <a-space>
            <UserOutlined />
            {{ `От пользователя: ${item.user.name}` }}
          </a-space>

          <a-space align="start">
            <QuestionCircleOutlined />
            {{ `Вопрос: ${item.text}` }}
          </a-space>

          <a-button
            type="primary"
            @click="onOpen(item)"
          >
            Ответить
          </a-button>
        </a-space>
      </a-list-item>
    </template>
  </a-list>

  <a-modal
    :open="Boolean(ticket)"
    :title="ticket?.text"
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
        label="Ответ на обращение"
        :rules="[{ required: true, message: 'Пожалуйста введите ответ на обращение!' }]"
      >
        <a-textarea
          v-model:value="form.text"
          placeholder="Введите ответ на обращение"
          :rows="4"
        />
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
