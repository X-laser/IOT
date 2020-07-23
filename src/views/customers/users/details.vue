<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="submit"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: `/customers/${$route.params.customerId}/users` })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ userInfo.name }}</h3>
      <div class="details">用户详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详细信息">
        <div class="button-container">
          <wx-button type="warning" @click="disableUser">禁用用户账户</wx-button>
          <wx-button type="warning" @click="showActiveLink">显示激活链接</wx-button>
          <wx-button type="warning" @click="sendEmail">重新发送激活</wx-button>
          <wx-button type="warning" @click="login">以用户身份登录</wx-button>
          <wx-button type="warning" @click="del">删除用户</wx-button>
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
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="审计日志">审计日志</el-tab-pane>
    </el-tabs>
    <icloud-dialog
      :visible.sync="visible"
      title="用户激活链接">
      <div class="link">
        <span>使用该链接<el-button type="text" class="active">激活</el-button>激活用户</span>
      </div>
      <div class="link-address">
        <code>{{ link }}</code>
      </div>
    </icloud-dialog>
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
      },
      link: '',
      visible: false
    }
  },
  methods: {
    async login () {
      const res = await this.$api.getToken(this.userInfo.id.id)
      if (res.status === 200) {
        this.$store.commit('SET_TOKEN', res.token)
        const userInfo = await this.$api.getUserInfo(this.userInfo.id.id)
        if (userInfo.status === 200) {
          this.$store.commit('SET_USER_INFO', userInfo.data)
          this.$router.push({ path: '/' })
        }
      }
    },
    del () {
      this.$confirm('小心！确认后,账户和所有相关数据将不可恢复。', `您确定要删除账户 '${this.userInfo.name}' 吗？`, {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteUser(this.userInfo.id.id)
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/users` })
        }
      }).catch(() => {})
    },
    async disableUser () {
      const userId = this.userInfo.id.id
      const userCredentialsEnabled = this.userInfo.additionalInfo.userCredentialsEnabled === false ? 1 : 0
      const res = await this.$api.postUserCredentialsEnabled(userId, Boolean(userCredentialsEnabled))
      if (res.status === 200) {
        this.$message.success('用户已禁用')
      }
    },
    async showActiveLink () {
      const res = await this.$api.getUserActivationLink(this.userInfo.id.id)
      if (res.status === 200) {
        this.link = res.data
        this.visible = true
      }
    },
    async sendEmail () {
      const res = await this.$api.postSendActivationMail(this.userInfo.email)
      if (res.status === 200) {
        this.$message.success('激活电子邮件已成功发送')
      }
    },
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
        const res = await this.$api.postUserSendActivationMail(params, false)
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/users/${this.userId}?title=${this.form.email}` })
          this.getUserInfo()
        }
      })
    },
    async getUserInfo () {
      const res = await this.$api.getUserInfo(this.userId)
      this.userInfo = res.data
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

<style lang="scss" scoped>
.active {
  font-size: 20px;
  padding: 0 5px;
}
.link {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
}
.link-address {
  code {
    margin: 20px 0;
    padding: 15px;
    display: inline-block;
    line-height: 1;
    color: #303030;
    font-size: 16px;
    font-family: monospace;
    font-weight: 700;
    background-color: #f7f7f7;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>
