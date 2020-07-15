<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="名称" prop="name">
      <el-input multiple v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="debugMode">
      <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
    </el-form-item>
    <el-form-item label="选择实体详细信息" prop="detailsList">
      <el-select
        v-model="form.detailsList"
        multiple
        filterable
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="addToMetadata">
      <el-checkbox v-model="form.addToMetadata">将选定的详细信息添加到消息元数据</el-checkbox>
    </el-form-item>
    <span class="desc">如果选中,则将所选的详细信息键添加到消息元数据而不是消息数据中</span>
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
        detailsList: [],
        addToMetadata: false,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
      },
      options: [
        { label: '标题', value: 'TITLE' },
        { label: '国家', value: 'COUNTRY' },
        { label: '州', value: 'STATE' },
        { label: '邮编', value: 'ZIP' },
        { label: '地址', value: 'ADDRESS' },
        { label: '地址2', value: 'ADDRESS2' },
        { label: '电话', value: 'PHONE' },
        { label: '电子邮件', value: 'EMAIL' },
        { label: '其他信息', value: 'ADDITIONAL_INFO' }
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
            detailsList: this.form.detailsList,
            addToMetadata: this.form.addToMetadata
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
      const { detailsList, addToMetadata } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        detailsList: detailsList || [],
        addToMetadata: addToMetadata || false,
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
  .desc {
    font-size: 12px;
    color: #808080;
  }
</style>
