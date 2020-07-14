<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="名称" prop="name">
      <el-input multiple v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="debugMode">
      <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
    </el-form-item>
    <el-form-item label="消息类型过滤器" prop="messageTypes">
      <el-select
        v-model="form.messageTypes"
        multiple
        filterable
        default-first-option
        placeholder="消息类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
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
        messageTypes: [],
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        messageTypes: [{ required: true, message: '消息类型过滤器不能为空', trigger: 'change' }]
      },
      options: [
        { label: 'Post attributes', value: 'POST_ATTRIBUTES_REQUEST' },
        { label: 'Post telemetry', value: 'POST_TELEMETRY_REQUEST' },
        { label: 'RPC Request from Device', value: 'TO_SERVER_RPC_REQUEST' },
        { label: 'RPC Request to Device', value: 'RPC_CALL_FROM_SERVER_TO_DEVICE' },
        { label: 'Activity Event', value: 'ACTIVITY_EVENT' },
        { label: 'Inactivity Event', value: 'INACTIVITY_EVENT' },
        { label: 'Connect Event', value: 'CONNECT_EVENT' },
        { label: 'Disconnect Event', value: 'DISCONNECT_EVENT' },
        { label: 'Entity Created', value: 'ENTITY_CREATED' },
        { label: 'Entity Updated', value: 'ENTITY_UPDATED' },
        { label: 'Entity Deleted', value: 'ENTITY_DELETED' },
        { label: 'Entity Assigned', value: 'ENTITY_ASSIGNED' },
        { label: 'Entity Unassigned', value: 'ENTITY_UNASSIGNED' },
        { label: 'Attributes Updated', value: 'ATTRIBUTES_UPDATED' },
        { label: 'Attributes Deleted', value: 'ATTRIBUTES_DELETED' }
      ]
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
            messageTypes: this.form.messageTypes
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
      const { messageTypes } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        messageTypes: messageTypes || [],
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
