import axios, { InternalAxiosRequestConfig } from "axios";

import { useUsersStore } from "../stores/users";
import { baseUrl } from '../utils'

const userStore = useUsersStore()

const api = axios.create({
  baseURL: baseUrl,
})

const authApi = axios.create({
  baseURL: baseUrl,
})

const onFulfilled = (config: InternalAxiosRequestConfig) => {
  const secretToken = userStore.accessToken
  return config
}
authApi.interceptors.request.use(onFulfilled)
export { api, authApi }