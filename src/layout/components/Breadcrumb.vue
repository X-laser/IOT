<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :to="index + 1 === breadcrumbList.length ? '' : { path: item.path }"
      :key="item.path">{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbList () {
      const breadcrumbList = this.$route.meta.breadcrumb.map(ele => {
        let pathList = ele.path.split('/')
        pathList = pathList.map((item, index) => {
          if (item.indexOf(':') !== -1) {
            item = this.$route.path.split('/')[index]
          }
          return item
        })
        return { ...ele, path: pathList.join('/') }
      })
      const length = breadcrumbList.length
      if (!breadcrumbList[length - 1].title) {
        breadcrumbList[length - 1].title = this.$route.query.title
      }
      return breadcrumbList
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: calc(#{$breadcrumb-height} - 1px);
  margin-left: 20px;
  /deep/ .el-breadcrumb__item {
    span, i {
      color: #000;
    }
    span {
      font-size: 16px;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
