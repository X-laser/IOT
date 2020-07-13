<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="详细信息">详细信息</el-tab-pane>
      <el-tab-pane label="属性">属性</el-tab-pane>
      <el-tab-pane label="最新遥测">最新遥测</el-tab-pane>
      <el-tab-pane label="警告">警告</el-tab-pane>
      <el-tab-pane label="事件">事件</el-tab-pane>
      <el-tab-pane label="关联">关联</el-tab-pane>
      <el-tab-pane label="审计日志">审计日志</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['deviceId']
}
</script>
