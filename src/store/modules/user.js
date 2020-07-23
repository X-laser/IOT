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
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    /** 设置token */
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login ({ commit }, { username, password, checkedPsd }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await api.login({ username, password })
          console.log(res)
          if (res.status === 200) {
            commit('SET_USER_INFO', {
              name: username,
              password: checkedPsd ? password : ''
            })
            setToken(res.data.token)
            router.push({ path: '/' })
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
