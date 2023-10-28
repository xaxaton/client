<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

const tickets = [
  {
    id: 1,
    ticket: 'Beside tune cowboy discovery noun should ready shallow hungry',
    answer:
      'Affect control divide eleven nest slave tree song brown summer partly dust chief shelter range feathers information poem enemy tall wheat hearing slipped electricity',
  },
  {
    id: 2,
    ticket: 'Scientific brain sharp plate alphabet upper habit queen physical',
    answer:
      'May make time dozen ordinary thick positive year pond driving driver foreign doubt southern sister made straw faster garage hospital spring planet mouse poet',
  },
  {
    id: 3,
    ticket: 'Radio rapidly period shall forget apart gave climate printed remarkable',
    answer:
      'Desert loss whispered shadow raw more bridge bicycle term needed hold news seed bare willing third offer event put central student citizen fort thumb',
  },
  {
    id: 4,
    ticket: 'Standard believed wherever pair look large only ahead prove wood blew',
    answer:
      'Nodded pink come shinning connected reader printed fairly pictured surprise parts complete suddenly interior image swam thy length silent taste age nice suit replied',
  },
  {
    id: 5,
    ticket: 'Sit road vote twelve day end facing hot party silent poet speed visit ',
  },
];
</script>

<template>
  <a-list
    size="small"
    :data-source="tickets"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-space direction="vertical">
          <a-space align="start">
            <QuestionCircleOutlined />
            {{ `Обращение: ${item.ticket}` }}
          </a-space>

          <a-space>
            Статус:
            <a-tag :color="item.answer ? 'green' : 'red'">
              {{ item.answer ? 'Ответ получен' : 'В обработке' }}
            </a-tag>
          </a-space>

          <div v-if="item.answer">{{ `Ответ: ${item.answer}` }}</div>
        </a-space>
      </a-list-item>
    </template>
  </a-list>
</template>
