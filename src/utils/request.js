import axios from 'axios'
import { tokenKey, getToken } from '@/utils/token'
import { Message } from 'element-ui'
import router from '@/router'

// create an axios instance
const http = axios.create()

const pending = []
const removePending = config => {
  for (const p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      pending[p].fn()
      pending.splice(p, 1)
    }
  }
}

// request interceptor
http.interceptors.request.use(
  config => {
    if (config.isToken) {
      config.headers[tokenKey] = `Bearer ${getToken()}`
    }
    if (!config.isLoop) {
      removePending(config)
      config.cancelToken = new axios.CancelToken(fn => {
        pending.push({ u: config.url + '&' + config.method, fn })
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// respone interceptor
http.interceptors.response.use(
  response => {
    if (!response.config.isLoop) {
      removePending(response.config)
    }
    return response
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        Message.error('登录过期')
        router.push({ path: '/login' })
      } else {
        Message.error(err.response.data.message)
      }
    }
    return Promise.reject(err)
  }
)

/**
 * @param {String} url 路劲
 * @param {String} method 请求方式
 * @param {Object} params 参数
 * @param {String} baseURL 请求头
 * @param {Number} timeout 请求时间
 * @param {Boolean} isToken 请求是否携带token
 * @param {Boolean} isLoop 接口是否轮询而不被取消
 * @return {AxiosPromise}
 */
export const request = ({ url, method = 'get', params, baseURL = 'BASE_URL', timeout, isToken = true, isLoop }) => {
  return http({
    baseURL: window.IP_CONFIG[baseURL],
    method,
    url,
    params: method === 'get' && params,
    data: method === 'post' && params,
    timeout: timeout || 30000,
    isToken: isToken,
    isLoop: isLoop || false
  })
}
