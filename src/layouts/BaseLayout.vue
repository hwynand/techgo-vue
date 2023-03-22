<template>
  <div id="header">
    <slot name="header"></slot>
  </div>
  <div id="main">
    <slot name="main"></slot>
  </div>
  <div id="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  methods: {
    ...mapActions(useUsersStore, ['checkLoggedIn']),
  },
  created() {
    this.checkLoggedIn()
  }
}
</script>

<style>
#main {
  padding: 91px 0;
  min-height: 90vh;
}
</style>