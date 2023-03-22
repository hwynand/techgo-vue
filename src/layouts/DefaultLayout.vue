<template>
  <base-layout>
    <template #header>
      <the-header />
    </template>
    <template #main>
      <slot></slot>
    </template>
    <template #footer>
      <the-footer />
    </template>
  </base-layout>
</template>

<script>
import TheFooter from '../components/TheFooter.vue';
import TheHeader from '../components/TheHeader.vue';
import BaseLayout from "./BaseLayout.vue";
export default {
  components: { BaseLayout, TheHeader, TheFooter },
};
</script>

<style></style>
