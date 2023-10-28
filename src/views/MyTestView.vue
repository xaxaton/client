<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

type FormValues = Record<number, number>;

interface Answer {
  questionId: number;
  answerId: number;
}

const router = useRouter();

const questions = [
  {
    id: 1,
    text: 'before frame along division greatest sharp will trail secret probably finally powder moving eleven handle dust band well various frequently from sold upon guess',
    answers: [
      {
        id: 1,
        text: 'dig slipped mirror outer think smooth driving effect atmosphere',
      },
      {
        id: 2,
        text: 'forest chemical everything space spent place lay various board',
      },
      {
        id: 3,
        text: 'worker became height bigger name pony atomic beyond magnet later',
      },
      {
        id: 4,
        text: 'black careful into fellow put twice pocket snow return tower over',
      },
    ],
  },
  {
    id: 2,
    text: 'silence beginning keep season properly gulf birth serious below run heading daily afraid what stop walk event mouse neighbor catch electricity direct magic becoming',
    answers: [
      {
        id: 5,
        text: 'film band usually say joy paper lying exclaimed discuss worth became',
      },
      {
        id: 6,
        text: 'already depth quickly sand age pole wonder sheet depend pair has other',
      },
      {
        id: 7,
        text: 'primitive natural coat beyond sheep function rich palace according',
      },
      {
        id: 8,
        text: 'refused pressure easy teeth vast under man tobacco examine get',
      },
    ],
  },
  {
    id: 3,
    text: 'fix noon flight dance physical applied supply anywhere daughter spend funny park shorter slightly sent pack return moment breathe walk husband require frighten straw',
    answers: [
      {
        id: 9,
        text: 'mill fun fed shorter coming obtain difference lost provide',
      },
      {
        id: 10,
        text: 'gun nobody plan almost coat rapidly sun darkness sitting',
      },
      {
        id: 11,
        text: 'according automobile split library neighbor left division',
      },
      {
        id: 12,
        text: 'activity solid laid slipped toward cold grandmother each',
      },
    ],
  },
  {
    id: 4,
    text: 'pick move led harbor percent noun pride course ago valuable wave gas stove off remember hay rest log behavior edge money impossible purpose choice',
    answers: [
      {
        id: 13,
        text: 'or gone roof vessels hot figure duty bean',
      },
      {
        id: 14,
        text: 'article deep scene motion stiff select smile rise',
      },
      {
        id: 15,
        text: 'son shop strip favorite shirt gradually doubt enemy tie',
      },
      {
        id: 16,
        text: 'hidden suit grain bottom throat use command mixture',
      },
    ],
  },
];

const form = reactive<FormValues>({});

const onFinish = (values: FormValues) => {
  console.log(
    Object.entries(values).reduce<Answer[]>((acc, [key, value]) => {
      acc.push({ questionId: Number(key), answerId: value });
      return acc;
    }, []),
  );

  message.success('Тест успешно отправлен!');
  router.push('/account/my-results');
};
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/account/my-tests">Мои тесты</router-link>
    </a-breadcrumb-item>

    <a-breadcrumb-item>Test name</a-breadcrumb-item>
  </a-breadcrumb>

  <a-divider />

  <h3>Test name</h3>

  <a-divider />

  <a-form
    :model="form"
    autocomplete="off"
    layout="vertical"
    @finish="onFinish"
  >
    <a-list
      size="small"
      :data-source="questions"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-form-item
            :name="item.id"
            :rules="[{ required: true, message: 'Пожалуйста выберите вариант ответа!' }]"
          >
            <template #label>
              <a-typography-text strong>{{ item.text }}</a-typography-text>
            </template>

            <a-radio-group v-model:value="form[item.id]">
              <a-space direction="vertical">
                <a-radio
                  v-for="answer in item.answers"
                  :key="answer.id"
                  :value="answer.id"
                >
                  {{ answer.text }}
                </a-radio>
              </a-space>
            </a-radio-group>
          </a-form-item>
        </a-list-item>
      </template>
    </a-list>

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
