import { defineStore } from "pinia"

import { api, authApi } from "../apis"

interface IAuth {
  isLoggedIn: boolean,
  user: IUserData
}

interface IUserData {
  firstname: string,
  lastname: string,
  gender: number,
  email: string
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    auth: {
      isLoggedIn: false,
      user: null
    },
    count: 0,
  }),
  getters: {

  },
  actions: {
    setAuth() {

    },
    async login({ email, password }) {
      const params = new URLSearchParams()
      params.append('username', email)
      params.append('password', password)
      const res = await api.post('/login/access-token', params)
      console.log('res', res.status)
      if (res.status === 200) {
        localStorage.setItem('access-token', res.data.access_token)
        localStorage.setItem('isLoggedIn', 'true')
        const resProfile = await this.getProfile()

      }
      return res
    },
    async getProfile() {
      const res = await authApi.get('/users/me')
      if (res.status === 200) {
        this.auth.isLoggedIn = true
        this.auth.user = res.data
        localStorage.setItem('user', JSON.stringify(this.auth.user))
      }
      return res
    },
    checkLoggedIn() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('user')
      if (isLoggedIn && userData) {
        console.log('checked')
        this.auth.isLoggedIn = true
        this.auth.user = JSON.parse(userData)
      }
    },
    logout() {
      this.auth.user = null
      this.auth.isLoggedIn = false
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
    }
  }
})