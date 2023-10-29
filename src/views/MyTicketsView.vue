<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useTicketsStore } from '@/store/tickets';

interface FormValues {
  text: string;
}

const ticketsStore = useTicketsStore();

const open = ref(false);
const form = reactive<FormValues>({
  text: '',
});

const onClose = () => {
  open.value = false;
  form.text = '';
};

const onFinish = async (values: FormValues) => {
  await ticketsStore.createTicket(values.text);
  onClose();
};

onMounted(async () => {
  await ticketsStore.getTickets();
});
</script>

<template>
  <a-skeleton v-if="ticketsStore.loading" />

  <template v-else>
    <a-button
      type="primary"
      style="margin-bottom: 24px"
      @click="open = true"
    >
      Отправить обращение
    </a-button>

    <a-list
      size="small"
      :data-source="ticketsStore.tickets"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-space direction="vertical">
            <a-space align="start">
              <QuestionCircleOutlined />
              {{ `Обращение: ${item.text}` }}
            </a-space>

            <a-space>
              Статус:
              <a-tag :color="item.answer ? 'green' : 'red'">
                {{ item.answer ? 'Ответ получен' : 'В обработке' }}
              </a-tag>
            </a-space>

            <div v-if="item.answer">{{ `Ответ: ${item.answer.text}` }}</div>
          </a-space>
        </a-list-item>
      </template>
    </a-list>

    <a-modal
      :open="open"
      title="Обращение"
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
</template>
