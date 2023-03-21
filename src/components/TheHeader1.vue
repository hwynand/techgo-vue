<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <div v-if="auth.isLoggedIn">
    <div>{{ auth.user.email }}</div>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <router-link to="/dang-nhap">Login</router-link>
    <router-link to="/dang-ky">Register</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  computed: {
    ...mapState(useUsersStore, ['auth'])
  },
  methods: {
    ...mapActions(useUsersStore, ['logout']),
    submitLogout() {
      this.logout()
    }
  }
}
</script>

<style>

</style>