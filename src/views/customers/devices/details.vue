<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="save"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: `/customers/${$route.params.customerId}/devices` })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ deviceInfo.name }}</h3>
      <div class="details">设备详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详情">
        <div class="button-container">
          <wx-button type="warning" @click="remove">取消分配客户</wx-button>
          <wx-button type="warning" @click="openDialog">管理凭据</wx-button>
        </div>
        <el-form ref="deviceForm" :model="deviceForm" :rules="deviceRules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="deviceForm.name"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="type">
            <el-select v-model="deviceForm.type">
              <el-option v-for="item in DeviceTypeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-input v-model="deviceForm.label"></el-input>
          </el-form-item>
          <el-form-item prop="gateway">
            <el-checkbox v-model="deviceForm.gateway">是网关</el-checkbox>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="deviceForm.description"></el-input>
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
    <icloud-dialog
      :visible.sync="visible"
      title="设备凭据">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item label="凭据类型" prop="credentialsType">
          <el-select v-model="form.credentialsType">
            <el-option label="Access token" value="ACCESS_TOKEN"></el-option>
            <el-option label="X.509 Certificate" value="X509_CERTIFICATE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="RSA公钥" :prop="form.credentialsType === 'ACCESS_TOKEN' ? 'credentialsId' : 'credentialsValue'">
          <el-input v-model="form[form.credentialsType === 'ACCESS_TOKEN' ? 'credentialsId' : 'credentialsValue']"></el-input>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submit">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
export default {
  props: ['deviceId'],
  data () {
    return {
      deviceInfo: {},
      visible: false,
      deviceForm: {
        name: '',
        type: '',
        label: '',
        gateway: '',
        description: ''
      },
      deviceRules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        type: [{ required: true, message: '设备类型不能为空', trigger: 'change' }]
      },
      DeviceTypeList: [],
      credentialsInfo: {},
      form: {
        credentialsType: '',
        credentialsId: '',
        credentialsValue: ''
      },
      formRules: {
        credentialsId: [{ required: true, message: '访问令牌不能为空', trigger: 'change' }],
        credentialsValue: [{ required: true, message: '访问令牌不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    save () {
      this.$refs.deviceForm.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.deviceInfo,
          ...this.deviceForm,
          additionalInfo: {
            ...this.deviceInfo.additionalInfo,
            gateway: this.deviceForm.gateway,
            description: this.deviceForm.description
          }
        }
        delete params.gateway
        delete params.description
        const res = await this.$api.postDevice(params)
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/devices/${this.deviceId}?title=${this.deviceForm.name}` })
          this.getDeviceInfo()
        }
      })
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const res = await this.$api.postDeviceCredentials({
          ...this.credentialsInfo,
          ...this.form
        })
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.visible = false
        }
      })
    },
    remove () {
      this.$confirm('确认后,设备将被取消分配,客户将无法访问', `您确定要取消分配设备'${this.deviceInfo.name}'?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerDevice(this.deviceInfo.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/devices` })
        }
      }).catch(() => {})
    },
    async openDialog () {
      const res = await this.$api.getDeviceCredentials(this.deviceInfo.id.id)
      this.credentialsInfo = res.data
      this.form = {
        credentialsType: res.data.credentialsType || 'ACCESS_TOKEN',
        credentialsId: res.data.credentialsId,
        credentialsValue: res.data.credentialsValue
      }
      this.visible = true
    },
    async getDeviceTypes () {
      const res = await this.$api.getDeviceTypes()
      if (res.status === 200) {
        this.DeviceTypeList = res.data
      }
    },
    async getDeviceInfo () {
      const res = await this.$api.getItemDeviceInfo(this.deviceId)
      this.deviceInfo = res.data
      for (const key in this.deviceForm) {
        this.deviceForm[key] = this.deviceInfo[key]
      }
      this.deviceForm.description = this.deviceInfo.additionalInfo.description
      this.deviceForm.gateway = this.deviceInfo.additionalInfo.gateway || false
    }
  },
  async created () {
    await this.getDeviceTypes()
    await this.getDeviceInfo()
  }
}
</script>
