<template>
  <div class="user-container">
    <el-dropdown trigger="click" @command="handleCommand">
      <el-avatar :size="55" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="account">
      <span class="username">lushuping</span>
      <span class="user-author">设备管理员账户</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async handleCommand (command) {
      if (command === 'logout') {
        const res = await this.$api.logout()
        if (res.status === 200) {
          this.$store.dispatch('logout')
          this.$router.push({ path: '/login' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  width: 240px;
  height: 100%;
  float: right;
  .el-dropdown, .account {
    float: left;
  }
  .el-dropdown {
    height: 100%;
    width: 55px;
    display: flex;
    align-items: center;
    /deep/ .el-avatar {
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
  .account {
    margin-left: 27px;
    width: calc(100% - 27px - 55px);
    .username, .user-author {
      float: left;
      width: 100%;
      line-height: 1;
      font-size: 16px;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .username {
      margin: 20px 0 9px 0;
    }
  }
}
</style>
