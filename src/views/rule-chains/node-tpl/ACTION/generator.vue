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
    <el-form-item label="消息计数(0-无限)" prop="msgCount">
      <el-input type="number" :min="0" v-model="form.msgCount"></el-input>
    </el-form-item>
    <el-form-item label="以秒为单位的时间" prop="periodInSeconds">
      <el-input type="number" :min="1" v-model="form.periodInSeconds"></el-input>
    </el-form-item>
    <div class="type-container">
      <el-form-item label="类型" prop="originatorType">
        <el-select v-model="form.originatorType" @change="change">
          <el-option label="设备" value="DEVICE"></el-option>
          <el-option label="资产" value="ASSET"></el-option>
          <el-option label="实体视图" value="ENTITY_VIEW"></el-option>
          <el-option label="租户" value="TENANT"></el-option>
          <el-option label="客户" value="CUSTOMER"></el-option>
          <el-option label="仪表板" value="DASHBOARD"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备" prop="originatorId">
        <el-select v-model="form.originatorId">
          <el-option v-for="item in types" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="生成" prop="jsScript" class="js-container">
      <span>function Generate (prevMsg, prevMetadata, prevMsgType) {</span>
      <Editor language="javascript"
        :codes="form.jsScript"
        @onCodeChange="$value => form.jsScript = $value" />
      <span>}</span>
    </el-form-item>
    <wx-button type="primary" @click="test">测试发生器功能</wx-button>
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
    const msgCount = (rule, value, callback) => {
      if (Number(value) < 0) {
        callback(new Error('消息计数应大于或等于0'))
      } else if (value === '' || value === undefined) {
        callback(new Error('消息计数不能为空'))
      } else {
        callback()
      }
    }
    const periodInSeconds = (rule, value, callback) => {
      if (Number(value) < 0) {
        callback(new Error('以秒为单位的时间间隔应大于或等于1'))
      } else if (value === '' || value === undefined) {
        callback(new Error('以秒为单位的时间不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        msgCount: '',
        periodInSeconds: '',
        jsScript: '',
        originatorType: '',
        originatorId: '',
        debugMode: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        msgCount: [{ required: true, validator: msgCount, trigger: 'change' }],
        periodInSeconds: [{ required: true, validator: periodInSeconds, trigger: 'change' }]
      },
      types: []
    }
  },
  methods: {
    test () {
      alert('测试功能待开发')
    },
    async change (value, init) {
      console.log(value)
      if (init !== 'init') {
        this.types = []
        this.form.originatorId = ''
      }
      let apiName = ''
      let params = {
        pageSize: 50,
        page: 0,
        sortProperty: 'name',
        sortOrder: 'ASC'
      }
      switch (value) {
        case 'DEVICE':
          apiName = 'getDeviceInfo'
          break
        case 'ASSET':
          apiName = 'getAssetInfos'
          break
        case 'ENTITY_VIEW':
          apiName = 'getEntityViewList'
          break
        case 'TENANT':
          apiName = 'getTenantInfos'
          params = 'e65c8de0-aa12-11ea-80f5-9b5ada2d0814'
          break
        case 'CUSTOMER':
          apiName = 'getCustomersList'
          params = {
            ...params,
            sortProperty: 'title'
          }
          break
        case 'DASHBOARD':
          apiName = 'getDashboardsList'
          params = {
            ...params,
            sortProperty: 'title'
          }
          break
        default:
          break
      }
      const res = await this.$api[apiName](params)
      if (value === 'TENANT') {
        this.types = [res.data]
      } else {
        this.types = res.data.data
      }
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            msgCount: this.form.msgCount,
            periodInSeconds: this.form.periodInSeconds,
            originatorType: this.form.originatorType,
            originatorId: this.form.originatorId,
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
      const { msgCount, periodInSeconds, originatorType, originatorId, jsScript } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const defaultJsScript = 'var msg = { temp: 42, humidity: 77 };\nvar metadata = { data: 40 };\nvar msgType = "POST_TELEMETRY_REQUEST";\n\nreturn { msg: msg, metadata: metadata, msgType: msgType }'
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        msgCount: JSON.stringify(this.nodeInfo) === '{}' ? 0 : msgCount,
        periodInSeconds: JSON.stringify(this.nodeInfo) === '{}' ? 1 : periodInSeconds,
        originatorType,
        originatorId,
        jsScript: JSON.stringify(this.nodeInfo) === '{}' ? defaultJsScript : jsScript,
        description: description || ''
      }
      if (originatorType) {
        this.change(originatorType, 'init')
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
