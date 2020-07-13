<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">{{ customersInfo.name }}</h3>
      <div class="details">用户详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详情">
        <div class="button-container">
          <wx-button v-if="!(customersInfo.additionalInfo && customersInfo.additionalInfo.isPublic)" type="warning" size="mini" @click="jumpRouter(customersInfo, 'users')">管理用户账户</wx-button>
          <wx-button type="warning" @click="jumpRouter(customersInfo, 'assets')">管理用户资产</wx-button>
          <wx-button type="warning" @click="jumpRouter(customersInfo, 'devices')">管理用户设备</wx-button>
          <wx-button type="warning" @click="jumpRouter(customersInfo, 'dashboards')">管理用户应用</wx-button>
          <wx-button v-if="!(customersInfo && customersInfo.isPublic)" type="warning" @click="del(customersInfo)">删除用户</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="formRules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="国家" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item label="城市" prop="country">
              <el-input v-model="form.country"></el-input>
            </el-form-item>
            <el-form-item label="州" style="margin: 0 10px;" prop="state">
              <el-input v-model="form.state"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="zip">
              <el-input v-model="form.zip"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="地址2" prop="address2">
            <el-input v-model="form.address2"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('form')">保存</el-button>
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
  props: ['customerId'],
  data () {
    return {
      customersInfo: {},
      form: {
        title: '',
        description: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        address: '',
        address2: '',
        phone: '',
        email: ''
      },
      formRules: {
        title: [{ required: true, message: '标题不能为空' }],
        email: [
          { message: '请输入邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    del (row) {
      this.$confirm('小心！确认后,用户及其所有相关数据将不可恢复', `确定要删除用户'${row.name}'吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async _ => {
        const res = await this.$api.deleteCustomer(row.id.id)
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getCustomersInfo()
        }
      }).catch(() => {})
    },
    jumpRouter (row, path) {
      this.$router.push({ path: `/customers/${row.id.id}/${path}` })
    },
    submit (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { id, createdTime, tenantId } = this.customersInfo
        const params = Object.assign({
          additionalInfo: { description: this.form.description }
        }, this.form, { id, createdTime, tenantId })
        delete params.description
        const res = await this.$api.updateCustomer(params)
        if (res.status === 200) {
          this.$message.success('保存成功')
          this.$router.push({ path: this.$router.path, query: { ...this.$route.query, title: this.form.title } })
          this.getCustomersInfo()
        }
      })
    },
    async getCustomersInfo () {
      const res = await this.$api.getCustomersList({ page: 0, pageSize: 999999 })
      this.customersInfo = (res.data.data && res.data.data.filter(item => item.id.id === this.customerId))[0] || {}
      for (const key in this.form) {
        this.form[key] = key === 'description' ? this.customersInfo.additionalInfo.description : this.customersInfo[key]
      }
    }
  },
  created () {
    this.getCustomersInfo()
  }
}
</script>
