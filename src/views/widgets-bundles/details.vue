<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- <wx-button type="primary" icon="iconiconfontcheck" circle></wx-button> -->
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: '/widgets-bundles' })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ $route.query.title }}</h3>
      <div class="details">部件包详细信息</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in tabPaneList" :key="item.label" :label="item.label">
        <component :is="item.componentName" :id="id"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { DetailsInfo } from './components'
export default {
  props: ['id'],
  components: { DetailsInfo },
  data () {
    return {
      tabPaneList: [
        { label: '详情', componentName: 'DetailsInfo' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  .btn-container {
    position: absolute;
    top: 40px;
    right: 30px;
    .wx-button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
