<script setup lang="ts">
import TheContainer from '@/components/TheContainer.vue';
</script>

<template>
  <TheContainer>
    <a-card :class="$style.card">
      <router-view />
    </a-card>
  </TheContainer>
</template>

<style module lang="scss">
.card {
  max-width: 500px;
  margin: 0 auto;
}
</style>
