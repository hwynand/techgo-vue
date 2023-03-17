import { defineStore } from "pinia"

export const useUsersStore = defineStore('users', {
  state: () => ({
    accessToken: '' as string,
  })
})