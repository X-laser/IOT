<template>
  <div class="logo-container">
    <div class="logo">{{ require('@/settings.js').title }}</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.logo-container {
  line-height: $header-height;
  float: left;
  .logo {
    color: #000;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    text-indent: 30px;
  }
}
</style>
