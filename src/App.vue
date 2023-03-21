<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>

<template>
  <default-layout>
    <div class="main-view">
      <RouterView />
    </div>
  </default-layout>
</template>

<style scoped>
.main-view {
  padding-top: 75px;
}
</style>
