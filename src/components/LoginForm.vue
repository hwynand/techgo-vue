<script>
import { mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['login']),
    async submit() {
      const data = {
        email: this.email,
        password: this.password,
      }
      const res = await this.login(data)
      console.log(res)
      if (res.status === 200) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="email">Email</label>
    <input type="text" name="email" id="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password">
    <button type="submit">Login</button>
  </form>
</template>