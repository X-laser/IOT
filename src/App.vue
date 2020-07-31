<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
export default {
  name: 'App',
  data () {
    return {
      websocket: null,
      msg: JSON.stringify({
        attrSubCmds: [],
        tsSubCmds: [
          {
            entityType: 'ASSET',
            entityId: '33ec82e0-aa13-11ea-8895-a334369cd4d6',
            scope: 'LATEST_TELEMETRY',
            cmdId: 1
          }
        ],
        historyCmds: []
      })
    }
  },
  computed: {
    token () {
      return getToken()
    }
  },
  methods: {
    initWebSocket () {
      const wsUrl = `ws://10.10.14.200/api/ws/plugins/telemetry?token=${getToken()}`
      this.$store.dispatch('initWebSocket', wsUrl)
    }
  },
  created () {
    this.initWebSocket()
  },
  watch: {
    $route (to, form) {
      if (to.name === 'login') {
        this.$store.dispatch('logout')
        const dialog = document.getElementsByClassName('icloud-dialog__wrapper')
        for (let i = 0; i < dialog.length; i++) {
          dialog[i].style.display = 'none'
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
