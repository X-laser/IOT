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
    <el-form-item label="消息数据" prop="messageNames">
      <el-select
        v-model="form.messageNames"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="消息数据">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="消息元数据" prop="metadataNames">
      <el-select
        v-model="form.metadataNames"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="消息数据">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="checkAllKeys">
      <el-checkbox v-model="form.checkAllKeys">检查所有选定键是否存在</el-checkbox>
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
        messageNames: [],
        metadataNames: [],
        checkAllKeys: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        messageNames: [{ required: true, message: '消息数据不能为空', trigger: 'change' }],
        metadataNames: [{ required: true, message: '消息元数据不能为空', trigger: 'change' }]
      },
      options: []
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
            messageNames: this.form.messageNames,
            metadataNames: this.form.metadataNames,
            checkAllKeys: this.form.checkAllKeys || false
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
      const { messageNames, metadataNames, checkAllKeys } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        messageNames: messageNames || [],
        metadataNames: metadataNames || [],
        checkAllKeys: checkAllKeys || false,
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
