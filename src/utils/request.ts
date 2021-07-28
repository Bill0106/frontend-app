import { API_URI } from '@/constants/env'
import axios from 'axios'

export interface Response {
  data: {
    data: unknown
  }
}

const request = () => {
  const instance = axios.create({
    baseURL: `${API_URI}/v1`,
    headers: { session: localStorage.getItem('session') }
  })

  instance.interceptors.response.use(
    res => {
      const resp = res as Response
      if (resp.data) {
        return resp.data.data
      }

      return res.data
    },
    error => {
      const { response: { data } } = error
      const err = new Error(typeof data === 'string' ? data : data.message)

      return Promise.reject(err)
    }
  )

  const get = <T, P = unknown>(path: string, params?: P) => {
    return instance.request<T>({ method: 'GET', url: path, params })
  }

  return { get }
}

export default request()
