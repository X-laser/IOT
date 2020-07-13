/**
 * 登录
*/
import { request } from '@/utils/request'

export default {
  login: params => request({ url: '/api/auth/login', method: 'post', params, isToken: false }),
  logout: _ => request({ url: '/api/auth/logout', method: 'post' })
}
