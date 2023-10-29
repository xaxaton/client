<script setup lang="ts">
import { ref, h } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { QrcodeOutlined } from '@ant-design/icons-vue';
import { useQR } from '@/composables/qr';
import { useUserStore } from '@/store/user';
import { Role } from '@/types/auth';
import { formatFullName } from '@/utils/format';

const userStore = useUserStore();
const { error, paintBoundingBox, onError, onDetect } = useQR();

const open = ref(false);

const roles: Record<Role, string> = {
  0: 'Сотрудник',
  1: 'HR',
  2: 'Администратор',
  3: 'Супер-пользователь',
};
</script>

<template>
  <a-space
    v-if="userStore.user"
    direction="vertical"
    size="large"
  >
    <template v-if="!userStore.user.organization">
      <a-alert
        message="Вы не состоите в организации"
        type="warning"
        show-icon
      >
        <template #description>
          <a-space direction="vertical">
            <a-typography-text
              >Получите приглашение от администратора организации по Email или просканируйте
              QR-код</a-typography-text
            >

            <a-button
              type="primary"
              :icon="h(QrcodeOutlined)"
              @click="open = true"
            >
              Сканировать QR-код
            </a-button>
          </a-space>
        </template>
      </a-alert>
    </template>

    <a-statistic
      title="Ваше имя"
      :value="formatFullName(userStore.user)"
    />

    <a-statistic
      title="Ваш Email"
      :value="userStore.user.email"
    />

    <a-statistic
      v-if="userStore.user.department"
      title="Ваш отдел"
      :value="userStore.user.department"
    />

    <a-statistic
      v-if="userStore.user.position"
      title="Ваша должность"
      :value="userStore.user.position"
    />

    <a-statistic
      title="Ваше имя"
      :value="formatFullName(userStore.user)"
    />

    <a-statistic
      title="Роль"
      :value="roles[userStore.user.role]"
    />
  </a-space>

  <a-modal
    :open="open"
    title="Наведите камеру на QR-код"
    width="100%"
    :wrap-class-name="$style.modal"
    :footer="null"
    @cancel="open = false"
  >
    <a-alert
      v-if="error"
      :message="error"
      :class="$style.alert"
      type="error"
      show-icon
      closable
      @close="error = ''"
    />

    <QrcodeStream
      :track="paintBoundingBox"
      @detect="onDetect"
      @error="onError"
    />
  </a-modal>
</template>

<style module lang="scss">
.modal {
  :global(.ant-modal) {
    top: 0;
    max-width: 100%;
    padding-bottom: 0;
    margin: 0;
  }

  :global(.ant-modal-content) {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  :global(.ant-modal-body) {
    flex: 1;
  }
}
</style>
