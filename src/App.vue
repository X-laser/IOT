<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
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
