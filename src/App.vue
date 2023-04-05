<script setup>
import { useRoute, RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import { computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()

const layout = computed(() => {
  if (route.path.includes('admin')) {
    return AdminLayout
  } else {
    return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
