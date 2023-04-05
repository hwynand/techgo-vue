<template>
  <base-layout>
    <template #header>
      admin header
    </template>
    <template #main>
      <slot></slot>
    </template>
    <template #footer>
      admin footer
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "./BaseLayout.vue";
export default {
  components: { BaseLayout },
};
</script>