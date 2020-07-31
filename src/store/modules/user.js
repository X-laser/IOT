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
      if (userInfo) {
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      } else {
        window.sessionStorage.removeItem('userInfo')
      }
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
          if (res.status === 200) {
            setToken(res.data.token)
            const userInfo = await api.getUser()
            if (userInfo.status === 200) {
              commit('SET_USER_INFO', {
                ...userInfo.data,
                password: checkedPsd ? password : ''
              })
              commit('SET_PERMISSION_ROUTER', userInfo.data.authority)
              router.push({ path: '/' })
            }
          }
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_PERMISSION_ROUTER')
        commit('SET_USER_INFO')
        resolve()
      })
    }
  }
}
export default user
