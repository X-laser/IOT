import Cookies from 'js-cookie'

// 过期时间8小时
const timer = 1 / 24 * 8

export const tokenKey = 'X-Authorization'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = token => Cookies.set(tokenKey, token, { expires: timer })
export const removeToken = () => Cookies.remove(tokenKey)
