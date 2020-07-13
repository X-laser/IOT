<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">{{ userInfo.name }}</h3>
      <div class="details">用户详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详细信息">
        <div class="button-container">
          <wx-button type="warning">禁用用户账户</wx-button>
          <wx-button type="warning">显示激活链接</wx-button>
          <wx-button type="warning">重新发送激活</wx-button>
          <wx-button type="warning">以用户身份登录</wx-button>
          <wx-button type="warning">删除用户</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="formRules">
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="firstName">
            <el-input v-model="form.firstName"></el-input>
          </el-form-item>
          <el-form-item label="姓" prop="lastName">
            <el-input v-model="form.lastName"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <wx-button type="primary" @click="submit">修改</wx-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="审计日志">审计日志</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['userId'],
  data () {
    return {
      userInfo: {},
      form: {
        email: '',
        firstName: '',
        lastName: '',
        description: ''
      },
      formRules: {
        email: [
          { required: true, message: '电子邮件必填', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的电子邮件地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.userInfo,
          ...this.form,
          additionalInfo: {
            ...this.userInfo.additionalInfo,
            description: this.form.description
          }
        }
        const res = await this.$api.updateUser(params, false)
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/users/${this.userId}?title=${this.form.email}` })
          this.getUserInfo()
        }
        console.log(params)
      })
    },
    async getUserInfo () {
      const res = await this.$api.getCustomersUserList({
        page: 0,
        pageSize: 999999
      }, this.$route.params.customerId)
      this.userInfo = res.data.data.filter(item => item.id.id === this.userId)[0]
      for (const key in this.form) {
        this.form[key] = key === 'description' ? this.userInfo.additionalInfo.description : this.userInfo[key]
      }
      console.log(this.userInfo)
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
