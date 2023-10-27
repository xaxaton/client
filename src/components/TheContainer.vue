<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style module lang="scss">
.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}
</style>
