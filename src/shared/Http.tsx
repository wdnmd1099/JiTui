import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockSession, mockTagIndex } from "../mock/mock";
import { loaderSwitch } from "./Loader";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

const mock = (response: AxiosResponse) => { //非本地地址不用mock，所以可以把这些代码放到线上环境
  if (location.hostname !== 'localhost' 
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.0.101') { return false }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      console.log('response')
      console.log(response)
      return true
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
      case 'me':
      [response.status, response.data] = mockSession(response.config)
      return true
  }
  return false
}

export const http = new Http('http://121.196.236.94:8080/api/v1')

http.instance.interceptors.request.use(config => { //请求前显示loader，无论请求成功或失败都关闭loader
  loaderSwitch.value = true
  return config
},()=>{
  loaderSwitch.value = false
})

http.instance.interceptors.response.use((response) => { //响应成功或失败都关闭loader
  loaderSwitch.value = false
  return response
}, (error) => {
  loaderSwitch.value = false
  throw error
})


http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
})

http.instance.interceptors.response.use((response) => {
  mock(response)
  return response
}, (error) => {
  if (mock(error.response)) {
    return error.response
  } else {
    throw error
  }
})
http.instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 429) {
        alert('你太频繁了')
      }
    }
    throw error
  }
)