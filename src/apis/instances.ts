import axios, { InternalAxiosRequestConfig } from "axios";

import { baseUrl } from '../utils'

const api = axios.create({
  baseURL: baseUrl,
  paramsSerializer: {
    indexes: null
  }
})

const authApi = axios.create({
  baseURL: baseUrl,
  paramsSerializer: {
    indexes: null
  },
  headers: { Authorization: `Bearer + ${localStorage.getItem('access-token')}` }
})


const onFulfilled = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access-token')
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  return config
}
authApi.interceptors.request.use(onFulfilled)
export { api, authApi }