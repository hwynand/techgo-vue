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
    allUsers: [],
    detailUser: {},
    totalUsers: 0,
  }),
  actions: {
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
    async register({ data }) {
      const res = await api.post('/register', data)
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
    async updateProfile({ data }) {
      const res = await authApi.put('/users/me', data)
      return res
    },
    checkLoggedIn() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('user')
      if (isLoggedIn && userData) {
        console.log('userData', userData);
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
      // localStorage.removeItem('access-token')
    },
    async getUsers({ skip }, { limit }) {
      try {
        const res = await authApi.get(`/users/?page=${skip}&size=${limit}`)
        if (res.status === 200) {
          this.allUsers = res.data.results
          this.totalUsers = res.data.total
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUser({ id }) {
      try {
        const res = await authApi.get(`/users/${id}`)
        if (res.status === 200) {
          this.detailUser = res.data.results
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})