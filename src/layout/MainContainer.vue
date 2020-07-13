<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100% - #{$breadcrumb-height});
  > .app-container {
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    margin-left: 20px;
  }
}
</style>
