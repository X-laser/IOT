<template>
  <el-form ref="form" :model="form" :rules="rules">
    <div class="name-container">
      <el-form-item label="规则链" prop="name">
        <el-select v-model="form.name">
          <el-option v-for="item in ruleChainList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="debugMode">
        <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
      </el-form-item>
    </div>
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
        description: ''
      },
      rules: {
        name: [{ required: true, message: '规则链不能为空', trigger: 'change' }]
      },
      ruleChainList: []
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {},
          additionalInfo: {
            description: this.form.description
          },
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit'
        })
      })
    },
    async getRuleChains () {
      const res = await this.$api.getRuleChainsList({
        pageSize: 50,
        page: 0,
        sortProperty: name,
        sortOrder: 'ASC'
      })
      this.ruleChainList = res.data.data
    },
    init () {
      const { name, debugMode } = this.nodeInfo
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
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
