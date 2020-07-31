import { getToken } from '@/utils/token'

const websocket = {
  state: {
    websocket: null,
    websocketData: null
  },
  mutations: {
    WEBSOCKET_DATA: (state, data) => {
      state.websocketData = data
    }
  },
  actions: {
    initWebSocket ({ state, dispatch }, wsUrl) {
      state.websocket = new WebSocket(wsUrl)
      state.websocket.onopen = () => dispatch('websocketonopen')
      state.websocket.onmessage = e => dispatch('websocketonmessage', e)
      state.websocket.onerror = () => dispatch('websocketonerror')
      state.websocket.onclose = () => dispatch('websocketclose')
    },
    // 连接成功
    websocketonopen () {
      console.log('websocket连接成功')
    },
    // 数据接收
    websocketonmessage ({ commit }, e) {
      commit('WEBSOCKET_DATA', (e && JSON.parse(e.data)) || null)
    },
    // 错误
    websocketonerror ({ state }, e) {
      console.log('websocket连接错误', e)
    },
    // 关闭
    websocketclose () {
      console.log('websocket关闭')
    },
    // 数据发送
    websocketsend ({ state, dispatch }, params) {
      if (!state.websocket) {
        const wsUrl = `ws://10.10.14.200/api/ws/plugins/telemetry?token=${getToken()}`
        dispatch('initWebSocket', wsUrl)
      }
      let timer = null
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        if (state.websocket.readyState === 1) {
          state.websocket.send(params)
          clearTimeout(timer)
        }
      }, 3000)
    }
  }
}

export default websocket
