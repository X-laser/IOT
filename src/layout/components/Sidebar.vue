<template>
  <el-menu router class="el-menu">
    <el-menu-item v-for="item in sidebarList" :key="item.path" :index="item.path" :class="isActive(item)">
      <i class="iconfont" :class="item.children[0].meta.icon"></i>
      <span slot="title">{{ item.children[0].meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    sidebarList () {
      return this.$store.getters.permissionRouter
    }
  },
  methods: {
    // 解决刷新之后menu-item没有高亮选择问题
    isActive (item) {
      return item.path === `/${this.$route.path.split('/')[1]}` ? 'is-active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  width: calc(100% - 22px);
  float: right;
  > .el-menu-item {
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    position: relative;
    span {
      font-size: 16px;
      color: #000;
    }
    i {
      color: #6993FF;
      font-size: 16px;
      margin-right: 20px;
    }
    &.is-active {
      background-color: #6993FF;
      span, i {
        color: #fff;
      }
      &:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 10px;
        background-color: #6993FF;
        top: 0;
        left: -22px;
      }
    }
  }
}
</style>
