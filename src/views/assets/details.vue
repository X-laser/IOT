<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="submit('form')"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: '/assets' })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ assetsInfo.name }}</h3>
      <div class="details">资产详情</div>
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
          <el-form-item label="资产类型" prop="type">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
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
  props: ['assetId'],
  data () {
    return {
      assetsInfo: {},
      form: {
        name: '',
        type: '',
        label: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        type: [{ required: true, message: '资产类型不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.assetsInfo,
          ...this.form,
          additionalInfo: {
            description: this.form.description
          }
        }
        delete params.description
        const res = await this.$api.postAsset(params)
        if (res.status === 200) {
          this.$message.success('资产修改成功')
          this.$router.push({ path: `/assets/${this.assetId}`, query: { title: this.form.name } })
          this.getAssetsInfo()
        }
      })
    },
    async getAssetsInfo () {
      const res = await this.$api.getAssetInfos({
        page: 0,
        pageSize: 999999
      })
      this.assetsInfo = res.data.data.filter(item => item.id.id === this.assetId)[0]
      for (const key in this.form) {
        this.form[key] = key === 'description' ? this.assetsInfo.additionalInfo && this.assetsInfo.additionalInfo.description : this.assetsInfo[key]
      }
    }
  },
  created () {
    this.getAssetsInfo()
  }
}
</script>
