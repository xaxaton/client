<script setup lang="ts">
import { ref, reactive, h } from 'vue';
import { useRoute } from 'vue-router';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

interface Question {
  key: number;
  value: string;
  correct: boolean;
}

interface FormValues {
  text: string;
  questions: Question[];
}

const questions = [
  {
    id: 1,
    text: 'before frame along division greatest sharp will trail secret probably finally powder moving eleven handle dust band well various frequently from sold upon guess',
    answers: [
      {
        id: 1,
        text: 'dig slipped mirror outer think smooth driving effect atmosphere',
        correct: true,
      },
      {
        id: 2,
        text: 'forest chemical everything space spent place lay various board',
        correct: false,
      },
      {
        id: 3,
        text: 'worker became height bigger name pony atomic beyond magnet later',
        correct: false,
      },
      {
        id: 4,
        text: 'black careful into fellow put twice pocket snow return tower over',
        correct: false,
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
        correct: false,
      },
      {
        id: 6,
        text: 'already depth quickly sand age pole wonder sheet depend pair has other',
        correct: true,
      },
      {
        id: 7,
        text: 'primitive natural coat beyond sheep function rich palace according',
        correct: false,
      },
      {
        id: 8,
        text: 'refused pressure easy teeth vast under man tobacco examine get',
        correct: false,
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
        correct: false,
      },
      {
        id: 10,
        text: 'gun nobody plan almost coat rapidly sun darkness sitting',
        correct: false,
      },
      {
        id: 11,
        text: 'according automobile split library neighbor left division',
        correct: false,
      },
      {
        id: 12,
        text: 'activity solid laid slipped toward cold grandmother each',
        correct: true,
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
        correct: false,
      },
      {
        id: 14,
        text: 'article deep scene motion stiff select smile rise',
        correct: true,
      },
      {
        id: 15,
        text: 'son shop strip favorite shirt gradually doubt enemy tie',
        correct: false,
      },
      {
        id: 16,
        text: 'hidden suit grain bottom throat use command mixture',
        correct: false,
      },
    ],
  },
];

const route = useRoute();

const open = ref(false);
const form = reactive<FormValues>({
  text: '',
  questions: [],
});

const onClose = () => {
  open.value = false;
  form.text = '';
  form.questions = [];
};

const onDelete = (id: number) => {
  console.log(id);
};

const onFinish = () => {
  if (form.questions.length < 2) {
    message.error('Вопрос должен содержать хотя бы 2 варианта ответа!');
    return;
  }

  if (form.questions.every((question) => !question.correct)) {
    message.error('Выберите верный вариант ответа!');
    return;
  }

  console.log(form);
};

const onDeleteQuestion = (index: number) => {
  form.questions.splice(index, 1);
};

const onAddQuestion = () => {
  form.questions.push({
    value: '',
    key: Date.now(),
    correct: false,
  });
};

const onToggleQuestion = (index: number) => {
  if (!form.questions[index].correct) {
    form.questions.forEach((question) => {
      question.correct = false;
    });
    form.questions[index].correct = true;
  }
};
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/account/tests-base">База тестов</router-link>
    </a-breadcrumb-item>

    <a-breadcrumb-item>{{ route.params.id }}</a-breadcrumb-item>
  </a-breadcrumb>

  <a-divider />

  <h3>{{ route.params.id }}</h3>

  <a-divider />

  <a-button
    :class="$style.add"
    type="primary"
    @click="open = true"
  >
    Добавить вопрос
  </a-button>

  <a-list
    size="small"
    :data-source="questions"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-space direction="vertical">
          <a-space size="large">
            <a-typography-text strong>{{ item.text }}</a-typography-text>

            <a-popconfirm
              title="Вы действительно хотите удалить вопрос?"
              cancel-text="Нет"
              ok-text="Да"
              @confirm="onDelete(item.id)"
            >
              <a-button
                danger
                size="small"
                type="primary"
                :icon="h(DeleteOutlined)"
              />
            </a-popconfirm>
          </a-space>

          <a-typography-text
            v-for="answer in item.answers"
            :key="answer.id"
          >
            <a-tag
              v-if="answer.correct"
              color="green"
            >
              Верный
            </a-tag>

            {{ answer.text }}
          </a-typography-text>
        </a-space>
      </a-list-item>
    </template>
  </a-list>

  <a-modal
    :open="open"
    title="Вопрос"
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
        label="Текст вопроса"
        :rules="[{ required: true, message: 'Пожалуйста введите текст вопроса!' }]"
      >
        <a-input v-model:value="form.text" />
      </a-form-item>

      <a-form-item
        v-for="(question, index) in form.questions"
        :key="question.key"
        :name="['questions', index, 'value']"
        :rules="[{ required: true, message: 'Пожалуйста введите вариант ответа!' }]"
      >
        <template #label>
          <a-space>
            Вариант ответа {{ index + 1 }}

            <a-tag
              :color="question.correct ? 'green' : 'red'"
              :class="{ [$style.pointer]: !question.correct }"
              @click="onToggleQuestion(index)"
            >
              {{ question.correct ? 'Верный' : 'Неверный' }}
            </a-tag>
          </a-space>
        </template>

        <a-row
          align="middle"
          :gutter="8"
        >
          <a-col style="flex-grow: 1">
            <a-input v-model:value="form.questions[index].value" />
          </a-col>

          <a-col v-if="form.questions.length > 2">
            <MinusCircleOutlined
              :class="$style.delete"
              @click="onDeleteQuestion(index)"
            />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row justify="center">
          <a-col>
            <a-button
              type="dashed"
              @click="onAddQuestion"
            >
              <PlusOutlined />
              Добавить вариант ответа
            </a-button>
          </a-col>
        </a-row>
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

<style module lang="scss">
.pointer {
  cursor: pointer;
}

.delete {
  font-size: 24px;
  color: #999;
}

.add {
  margin-bottom: 24px;
}
</style>
