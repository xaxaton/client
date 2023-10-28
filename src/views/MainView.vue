<script setup lang="ts">
import { onMounted } from 'vue';
import TariffsList from '@/components/main/TariffsList.vue';
import { useTariffsStore } from '@/store/tariffs';

const tariffsStore = useTariffsStore();

onMounted(async () => {
  await Promise.all([tariffsStore.getTariffs()]);
});
</script>

<template>
  <a-space
    direction="vertical"
    size="large"
    :class="$style.main"
  >
    <a-card>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, optio consequuntur.
      Consequuntur atque molestiae vero cupiditate consequatur? Officia inventore, sapiente expedita
      perferendis aperiam, officiis a fugiat consectetur laborum magnam nesciunt.
    </a-card>

    <a-card id="possibilities">
      <h2>Возможности</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>
    </a-card>

    <a-card id="tariffs">
      <h2>Тарифы</h2>
      <TariffsList />
    </a-card>

    <a-card id="integration">
      <h2>Внедрение</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>
    </a-card>

    <a-card id="reviews">
      <h2>Отзывы</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium est, dignissimos ut
        pariatur eum ratione ab iste sunt recusandae expedita voluptatem sint, quis voluptatum
        atque. Eligendi blanditiis ea maxime quaerat!
      </p>
    </a-card>
  </a-space>
</template>

<style module lang="scss">
.main {
  h2 {
    margin-bottom: 24px;
  }
}
</style>
