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
    <el-form-item label="设置属性范围" prop="scope">
      <el-select v-model="form.scope">
        <el-option label="用户端属性" value="CLIENT_SCOPE"></el-option>
        <el-option label="服务端属性" value="SERVER_SCOPE"></el-option>
        <el-option label="共享属性" value="SHARED_SCOPE"></el-option>
      </el-select>
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
        scope: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
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
            scope: this.form.scope
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
      const { scope } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const is = JSON.stringify(this.nodeInfo) === '{}'
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        scope: is ? 'SERVER_SCOPE' : scope,
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
