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
    <el-form-item label="父模板" prop="fromTemplate">
      <el-input v-model="form.fromTemplate"></el-input>
      <span class="desc">从地址模板中,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="子模板" prop="toTemplate">
      <el-input v-model="form.toTemplate"></el-input>
      <span class="desc">用逗号分隔的地址列表,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="抄送模板" prop="ccTemplate">
      <el-input v-model="form.ccTemplate"></el-input>
      <span class="desc">用逗号分隔的地址列表,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="密件抄送模板" prop="bccTemplate">
      <el-input v-model="form.bccTemplate"></el-input>
      <span class="desc">用逗号分隔的地址列表,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="主题模板" prop="subjectTemplate">
      <el-input v-model="form.subjectTemplate"></el-input>
      <span class="desc">邮件主题模板,使用 ${metaKeyName} 替换元数据中的变量</span>
    </el-form-item>
    <el-form-item label="内容模板" prop="bodyTemplate">
      <el-input type="textarea" v-model="form.bodyTemplate"></el-input>
      <span class="desc">邮件正文模板,使用 ${metaKeyName} 替换元数据中的变量</span>
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
        description: '',
        fromTemplate: '',
        toTemplate: '',
        ccTemplate: '',
        bccTemplate: '',
        subjectTemplate: '',
        bodyTemplate: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        fromTemplate: [{ required: true, message: '父模板不能为空', trigger: 'change' }],
        toTemplate: [{ required: true, message: '子模板不能为空', trigger: 'change' }],
        subjectTemplate: [{ required: true, message: '主题模板不能为空', trigger: 'change' }],
        bodyTemplate: [{ required: true, message: '内容模板不能为空', trigger: 'change' }]
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
            fromTemplate: this.form.fromTemplate,
            toTemplate: this.form.toTemplate,
            ccTemplate: this.form.ccTemplate,
            bccTemplate: this.form.bccTemplate,
            subjectTemplate: this.form.subjectTemplate,
            bodyTemplate: this.form.bodyTemplate
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
      const { fromTemplate, toTemplate, ccTemplate, bccTemplate, subjectTemplate, bodyTemplate } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        fromTemplate: fromTemplate || 'info@testmail.org',
        toTemplate: toTemplate || '$' + '{userEmail}',
        ccTemplate,
        bccTemplate,
        subjectTemplate: subjectTemplate || 'Device ' + '$' + '{deviceType} temperature high',
        bodyTemplate: bodyTemplate || 'Device ' + '$' + '{deviceName} has high temperature ' + '$' + '{temp}',
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
