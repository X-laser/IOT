<template>
  <el-form ref="form" :model="form" :rules="rules">
    <div class="name-container">
      <el-form-item
        label="名称"
        prop="name"
        :rules="[{ required: true, message: '名称不能为空', trigger: 'change' }]">
        <el-input multiple v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="debugMode">
        <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
      </el-form-item>
    </div>
    <el-form-item label="GCP project ID" prop="projectId">
      <el-input v-model="form.projectId"></el-input>
    </el-form-item>
    <el-form-item label="Topic名称" prop="topicName">
      <el-input v-model="form.topicName"></el-input>
    </el-form-item>
    <el-form-item label="消息属性" prop="messageAttributes" class="attrMapping-container">
      <div class="desc">在名称/值字段中使用 ${metaKeyName} 替换元数据中的变量</div>
      <ul class="attrMapping">
        <li>
          <span>名称</span>
          <span>Value</span>
          <i class="el-icon-circle-plus-outline" @click="add"></i>
        </li>
        <li v-for="(item, index) in form.messageAttributes" :key="index">
          <el-input v-model="item.source" :class="item.source ? '' : 'is-error'"></el-input>
          <el-input v-model="item.target" :class="item.target ? '' : 'is-error'"></el-input>
          <i class="el-icon-delete" @click="remove(item)"></i>
        </li>
      </ul>
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
    const messageAttributes = (rule, value, callback) => {
      const messageAttributes = this.form.messageAttributes
      messageAttributes.forEach(item => {
        if (item.source === '') {
          callback(new Error('消息域不能为空'))
        }
        if (item.target === '') {
          callback(new Error('列不能为空'))
        }
      })
      callback()
    }
    return {
      form: {
        name: '',
        debugMode: '',
        projectId: '',
        topicName: '',
        messageAttributes: [],
        serviceAccountKey: '',
        serviceAccountKeyFileName: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        projectId: [{ required: true, message: 'GCP project ID不能为空', trigger: 'change' }],
        topicName: [{ required: true, message: 'Topic名称不能为空', trigger: 'change' }],
        messageAttributes: [{ required: true, validator: messageAttributes, trigger: 'change' }]
      }
    }
  },
  methods: {
    add () {
      this.form.messageAttributes.push({
        source: '',
        target: ''
      })
    },
    remove (item) {
      const index = this.form.messageAttributes.indexOf(item)
      if (index !== -1) {
        this.form.messageAttributes.splice(index, 1)
      }
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        const messageAttributes = {}
        this.form.messageAttributes.forEach(item => {
          messageAttributes[item.source] = item.target
        })
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            messageAttributes,
            projectId: this.form.projectId,
            topicName: this.form.topicName,
            serviceAccountKey: '',
            serviceAccountKeyFileName: ''
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
        messageAttributes,
        projectId,
        topicName,
        serviceAccountKey,
        serviceAccountKeyFileName
      } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      const is = JSON.stringify(this.nodeInfo) === '{}'
      let messageAttr = []
      if (is) {
        messageAttr = []
      } else {
        for (const key in messageAttributes) {
          messageAttr.push({
            source: key,
            target: messageAttributes[key]
          })
        }
      }
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        messageAttributes: messageAttr,
        projectId: is ? 'my-google-cloud-project-id' : projectId,
        topicName: is ? 'my-pubsub-topic-name' : topicName,
        serviceAccountKey,
        serviceAccountKeyFileName,
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
  .attrMapping-container {
    /deep/ .el-form-item__label {
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
    }
    &.is-error {
      /deep/ .attrMapping {
        .el-input {
          .el-input__inner {
            border-color: #DCDFE6;
            &:focus {
              border-color: #2DA7E0;
            }
            &:hover {
              border-color: #C0C4CC;
            }
          }
          &.is-error {
            .el-input__inner {
              border-color: #F56C6C;
            }
          }
        }
      }
    }
    .attrMapping {
      width: 100%;
      li {
        float: left;
        width: 100%;
        > span {
          float: left;
          width: 45%;
          text-align: center;
          font-size: 12px;
          color: rgba(0, 0, 0, .54);
          margin-bottom: 10px;
          margin-right: 10px;
        }
        .el-icon-circle-plus-outline {
          color: #67c23a;
          cursor: pointer;
        }
        .el-icon-delete {
          color: #f56c6c;
          cursor: pointer;
        }
        .el-input {
          width: 45%;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
