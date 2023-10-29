<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useTicketsStore } from '@/store/tickets';
import { Ticket } from '@/types/tickets';

interface FormValues {
  text: string;
}

const ticketsStore = useTicketsStore();

const form = reactive<FormValues>({
  text: '',
});
const ticket = ref<Ticket | null>(null);

const onOpen = (value: Ticket) => {
  ticket.value = value;
};

const onClose = () => {
  ticket.value = null;
  form.text = '';
};

const onFinish = async (values: FormValues) => {
  if (!ticket.value) return;
  await ticketsStore.createAnswer(ticket.value.id, values.text);
  onClose();
};

onMounted(async () => {
  await ticketsStore.getTickets();
  onClose();
});
</script>

<template>
  <a-skeleton v-if="ticketsStore.loading" />

  <a-list
    v-else
    size="small"
    :data-source="ticketsStore.tickets.filter((ticket) => !ticket.answer)"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-space direction="vertical">
          <a-space>
            <UserOutlined />
            {{ `От пользователя: ${item.full_name}` }}
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
              :loading="ticketsStore.loading"
            >
              Отправить
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
