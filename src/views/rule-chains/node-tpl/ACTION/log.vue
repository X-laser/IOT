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
    <el-form-item label="字符串" prop="jsScript" class="js-container">
      <span>function ToString (msg, metadata, msgType) {</span>
      <Editor language="javascript"
        :codes="form.jsScript"
        @onCodeChange="$value => form.jsScript = $value" />
      <span>}</span>
    </el-form-item>
    <wx-button type="primary" @click="test">测试字符串器功能</wx-button>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import Editor from '@/components/Editor'
export default {
  props: {
    nodeInfo: {
      type: Object
    }
  },
  components: { Editor },
  data () {
    return {
      form: {
        name: '',
        jsScript: '',
        debugMode: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    test () {
      alert('测试功能待开发')
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            jsScript: this.form.jsScript
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
      const { jsScript } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const defaultJsScript = "rn 'Incoming message:\\n' + JSON.stringify(msg) + \n  '\\nIncoming metadata:\\n' + JSON.stringify(metadata);"
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        jsScript: JSON.stringify(this.nodeInfo) === '{}' ? defaultJsScript : jsScript,
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

<style lang="scss" scoped>
  /deep/ .js-container {
    margin-bottom: 0 !important;
    .el-form-item__content {
      height: 300px;
      > span {
        float: left;
        width: 100%;
        line-height: 40px;
        font-size: 13px;
        color: #666;
      }
      .editor-container {
        margin-top: 60px;
        height: 270px;
        .overflow-guard {
          border-radius: 4px;
          border: 1px solid #DCDFE6;
        }
      }
    }
  }
</style>
