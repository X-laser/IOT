import api from '@/api'
import { setToken, removeToken } from '@/utils/token'
import router from '@/router'

const user = {
  state: {
    userInfo: {}
  },
  mutations: {
    /** 设置用户信息 */
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    login ({ commit }, { username, password, checkedPsd }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await api.login({ username, password })
          if (res.status === 200) {
            commit('SET_USER_INFO', res.data)
            setToken(res.data.token)
            router.push({ path: '/' })
          }
          // 记住密码
          if (checkedPsd) {
            window.sessionStorage.setItem('userInfo', JSON.stringify(Object.assign(res.data, { username, password })))
          } else {
            window.sessionStorage.setItem('userInfo', JSON.stringify(Object.assign(res.data, { username, password: '' })))
          }
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },
    logout () {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}
export default user
