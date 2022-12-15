import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ref } from "vue";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  // read
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config)=>{  //这行是添加请求拦截器 config 是请求相关的所有配置
  // 拦截器可以接收两个函数，第一个是请求成功做些什么，第二个是请求失败做些什么，具体看文档
  const jwt = localStorage.getItem('jwt')  //这下面几行都是为http的所有请求的头加上jwt的字符串，在本项目用来验证登录是否通过服务器验证
  if(jwt){
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
})


export let wrongMessage = ref('');
http.instance.interceptors.response.use(response => { //这行是添加响应拦截器，也接收两个函数
  //第一个是状态码200以内的数据触发第一个函数，状态码200以外的触发第二个函数，200以内都是响应成功的，以外的是不成功的
  console.log('response')
  return response
}, (error) => {
  if (error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      alert('你太频繁了')
    }
  }
  throw error
})
