<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="submit"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: '/devices' })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ devicesInfo.name }}</h3>
      <div class="details">设备详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详细信息">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资产类型" prop="type">
            <el-select v-model="form.type">
              <el-option v-for="item in deviceTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
          <el-form-item prop="gateway">
            <el-checkbox v-model="form.gateway">是网关</el-checkbox>
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
  props: ['deviceId'],
  data () {
    return {
      devicesInfo: {},
      form: {
        name: '',
        type: '',
        label: '',
        gateway: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        type: [{ required: true, message: '设备类型不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.devicesInfo,
          ...this.form,
          additionalInfo: {
            description: this.form.description,
            gateway: this.form.gateway
          }
        }
        delete params.description
        delete params.gateway
        const res = await this.$api.postDevice(params)
        if (res.status === 200) {
          this.$message.success('设备修改成功')
          this.$router.push({ path: `/devices/${this.deviceId}`, query: { title: this.form.name } })
          this.getDeviceInfo()
        }
      })
    },
    async getDeviceInfo () {
      const res = await this.$api.getItemDeviceInfo(this.deviceId)
      this.devicesInfo = res.data
      this.form = {
        name: this.devicesInfo.name,
        type: this.devicesInfo.type,
        label: this.devicesInfo.label,
        gateway: this.devicesInfo.additionalInfo.gateway,
        description: this.devicesInfo.additionalInfo.description
      }
    }
  },
  created () {
    this.getDeviceInfo()
  }
}
</script>
