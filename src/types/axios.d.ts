import axios from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any> (config: AxiosRequestConfig): Promise<T>
  }
}
