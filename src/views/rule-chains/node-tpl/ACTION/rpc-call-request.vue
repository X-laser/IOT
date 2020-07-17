<template>
  <el-form ref="form" :model="form" :rules="rules">
    <div class="name-container">
      <el-form-item label="名称" prop="name">
        <el-input multiple v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="debugMode">
        <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
      </el-form-item>
    </div>
    <el-form-item label="请求ID元数据属性名称" prop="timeoutInSeconds">
      <el-input type="number" :num="0" v-model="form.timeoutInSeconds"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    nodeInfo: {
      type: Object
    }
  },
  data () {
    const timeoutInSeconds = (rule, value, callback) => {
      if (Number(value) < 0) {
        callback(new Error('以秒为单位的超时最小为0'))
      } else if (value === '' || value === undefined) {
        callback(new Error('以秒为单位的超时不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        debugMode: '',
        timeoutInSeconds: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        timeoutInSeconds: [{ required: true, validator: timeoutInSeconds, trigger: 'change' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            timeoutInSeconds: this.form.timeoutInSeconds
          },
          additionalInfo: {
            description: this.form.description
          },
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit'
        })
      })
    },
    init () {
      const { name, debugMode } = this.nodeInfo
      const { timeoutInSeconds } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const is = JSON.stringify(this.nodeInfo) === '{}'
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        timeoutInSeconds: is ? 60 : timeoutInSeconds,
        description: description || ''
      }
      console.log(this.form)
    }
  },
  created () {
    this.init()
  }
}
</script>
