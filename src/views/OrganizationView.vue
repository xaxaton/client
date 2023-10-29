<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue';
import { useOrganizationsStore } from '@/store/organizations';
import { useUserStore } from '@/store/user';
import { formatFullName } from '@/utils/format';

interface Option {
  value: number;
  label: string;
}

interface FormValues {
  id: number | null;
}

const userStore = useUserStore();
const organizationsStore = useOrganizationsStore();

const qrOpen = ref(false);
const userOpen = ref(false);
const userForm = reactive<FormValues>({
  id: null,
});

const options = computed<Option[]>(() => {
  return userStore.users.map((user) => ({
    value: user.id,
    label: formatFullName(user),
  }));
});

const onCloseUser = () => {
  userOpen.value = false;
  userForm.id = null;
};

const filterOption = (input: string, option: Option) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};

const onFinish = async (values: FormValues) => {
  await organizationsStore.invite(values.id!);
};

onMounted(async () => {
  if (userStore.hr) {
    await Promise.all([userStore.getUsers(), organizationsStore.getQr()]);
  }
});
</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <a-image :src="userStore.user?.organization?.logo" />
    </a-col>

    <a-col :span="24">
      <a-statistic
        title="Наименование организации"
        :value="userStore.user?.organization?.name"
      />
    </a-col>

    <a-col
      v-if="userStore.hr"
      :span="24"
    >
      <a-space>
        <a-button
          type="primary"
          @click="userOpen = true"
        >
          Добавить сотрудника
        </a-button>

        <a-button
          type="primary"
          @click="qrOpen = true"
        >
          Показать QR-код
        </a-button>
      </a-space>
    </a-col>
  </a-row>

  <a-modal
    :open="userOpen"
    title="Сотрудник"
    :footer="null"
    @cancel="onCloseUser"
  >
    <a-form
      :model="userForm"
      layout="vertical"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="Сотрудник"
        name="id"
        :rules="[{ required: true, message: 'Пожалуйста выберите сотрудника!' }]"
      >
        <a-select
          v-model:value="userForm.id"
          show-search
          :options="options"
          :filter-option="filterOption"
          :loading="userStore.loading"
        />
      </a-form-item>

      <a-form-item style="margin-bottom: -24px">
        <a-row
          justify="end"
          :gutter="8"
        >
          <a-col>
            <a-button @click="onCloseUser">Отмена</a-button>
          </a-col>

          <a-col>
            <a-button
              type="primary"
              html-type="submit"
              :loading="organizationsStore.loading"
            >
              Отправить
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:open="qrOpen"
    title="QR-код для добавления сотрудника в организацию"
    :footer="null"
  >
    <div
      v-if="organizationsStore.loading"
      :class="$style.spin"
    >
      <a-spin size="large" />
    </div>

    <a-qrcode
      v-else-if="organizationsStore.qr"
      :value="organizationsStore.qr"
      :icon="userStore.user?.organization?.logo"
      :size="472"
      :icon-size="120"
    />
  </a-modal>
</template>

<style module lang="scss">
.spin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
}
</style>
