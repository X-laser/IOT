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
    <el-form-item label="警报详细信息生成器" prop="alarmDetailsBuildJs" class="js-container">
      <span>function Details (msg, metadata, msgType) {</span>
      <Editor language="javascript"
        :codes="form.alarmDetailsBuildJs"
        @onCodeChange="$value => form.alarmDetailsBuildJs = $value" />
      <span>}</span>
    </el-form-item>
    <wx-button type="primary" @click="test">测试详细信息功能</wx-button>
    <el-form-item label="警报类型" prop="alarmType">
      <el-input v-model="form.alarmType"></el-input>
    </el-form-item>
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
        alarmDetailsBuildJs: '',
        alarmType: '',
        debugMode: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        alarmType: [{ required: true, message: '警报类型不能为空', trigger: 'change' }]
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
            alarmDetailsBuildJs: this.form.alarmDetailsBuildJs,
            alarmType: this.form.alarmType
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
      const { alarmDetailsBuildJs, alarmType } = this.nodeInfo.configuration || {}
      const defaultAlarmDetailsBuildJs = 'var details = {};\nif (metadata.prevAlarmDetails) {\n    details = JSON.parse(metadata.prevAlarmDetails);\n}\nreturn details;'
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        alarmDetailsBuildJs: JSON.stringify(this.nodeInfo) === '{}' ? defaultAlarmDetailsBuildJs : alarmDetailsBuildJs,
        alarmType: JSON.stringify(this.nodeInfo) === '{}' ? 'General Alarm' : alarmType,
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
