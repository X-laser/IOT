<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="名称" prop="name">
      <el-input multiple v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="debugMode">
      <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
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
        debugMode: false,
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
          debugMode: this.form.debugMode,
          name: this.form.name,
          additionalInfo: {
            description: this.form.description
          },
          configuration: {},
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit'
        })
      })
    },
    init () {
      const { name, debugMode } = this.nodeInfo
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name,
        debugMode: debugMode || false,
        description
      }
      console.log(this.form)
    }
  },
  created () {
    this.init()
  }
}
</script>
