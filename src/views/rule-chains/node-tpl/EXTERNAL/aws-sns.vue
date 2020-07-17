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
    <el-form-item label="Topic ARN 格式" prop="topicArnPattern">
      <el-input v-model="form.topicArnPattern"></el-input>
      <span class="desc">Topic ARN 格式,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="AWS访问密钥ID" prop="accessKeyId">
      <el-input v-model="form.accessKeyId"></el-input>
    </el-form-item>
    <el-form-item label="AWS加密访问密钥" prop="secretAccessKey">
      <el-input v-model="form.secretAccessKey"></el-input>
    </el-form-item>
    <el-form-item label="AWS区域" prop="region">
      <el-input v-model="form.region"></el-input>
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
    return {
      form: {
        name: '',
        debugMode: '',
        topicArnPattern: '',
        accessKeyId: '',
        secretAccessKey: '',
        region: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        topicArnPattern: [{ required: true, message: 'Topic ARN 格式不能为空', trigger: 'change' }],
        accessKeyId: [{ required: true, message: 'AWS访问密钥ID不能为空', trigger: 'change' }],
        secretAccessKey: [{ required: true, message: 'AWS加密访问密钥不能为空', trigger: 'change' }],
        region: [{ required: true, message: 'AWS区域不能为空', trigger: 'change' }]
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
            topicArnPattern: this.form.topicArnPattern,
            accessKeyId: this.form.accessKeyId,
            secretAccessKey: this.form.secretAccessKey,
            region: this.form.region
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
      const {
        topicArnPattern,
        accessKeyId,
        secretAccessKey,
        region
      } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const is = JSON.stringify(this.nodeInfo) === '{}'
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        topicArnPattern: is ? 'arn:aws:sns:us-east-1:123456789012:MyNewTopic' : topicArnPattern,
        accessKeyId,
        secretAccessKey,
        region: is ? 'us-east-1' : region,
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
