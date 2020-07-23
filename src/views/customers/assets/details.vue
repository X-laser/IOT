<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="submit"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: `/customers/${$route.params.customerId}/assets` })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ assetInfo.name }}</h3>
      <div class="details">用户详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详情">
        <div class="button-container">
          <wx-button type="warning" @click="remove">取消分配客户</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资产类型" prop="type">
            <el-select v-model="form.type">
              <el-option v-for="item in assetTypeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
            </el-select>
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
      assetInfo: {},
      form: {
        name: '',
        type: '',
        label: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        type: [{ required: true, message: '资产类型不能为空', trigger: 'change' }]
      },
      assetTypeList: []
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.assetInfo,
          ...this.form,
          additionalInfo: {
            description: this.form.description
          }
        }
        delete params.description
        const res = await this.$api.postAsset(params)
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/assets/${this.assetId}?title=${this.form.name}` })
          this.getAssetInfo()
        }
      })
    },
    remove () {
      this.$confirm('确认后，资产将未分配，客户无法访问', `您确定要取消对'${this.assetInfo.name}'资产的分配吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerAsset(this.assetInfo.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/assets` })
        }
      }).catch(() => {})
    },
    async getAssetTypes () {
      const res = await this.$api.getAssetTypes()
      if (res.status === 200) {
        this.assetTypeList = res.data
      }
    },
    async getAssetInfo () {
      const res = await this.$api.getItemAssetInfo(this.assetId)
      this.assetInfo = res.data
      for (const key in this.form) {
        this.form[key] = key === 'description' ? this.assetInfo.additionalInfo.description : this.assetInfo[key]
      }
    }
  },
  async created () {
    await this.getAssetTypes()
    await this.getAssetInfo()
  }
}
</script>
