<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">{{ entityInfo.name }}</h3>
      <div class="details">实体视图详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详情">
        <div class="button-container">
          <wx-button type="warning">资产设为公开</wx-button>
          <wx-button type="warning">分配给客户</wx-button>
          <wx-button type="warning">删除资产</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="实体视图类型" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
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
  props: ['entityId'],
  data () {
    return {
      entityInfo: {},
      form: {},
      rules: {}
    }
  }
}
</script>
