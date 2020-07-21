<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="规则链" prop="name">
      <el-select v-model="form.name">
        <el-option v-for="item in ruleChainList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
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
          name: this.ruleChainList.filter(item => item.id.id === this.form.name)[0].name,
          targetRuleChainId: {
            entityType: 'RULE_CHAIN',
            id: this.form.name
          },
          additionalInfo: {
            description: this.form.description
          },
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit',
          nodeType: 'RULE_CHAIN'
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
    async init () {
      const is = JSON.stringify(this.nodeInfo) === '{}'
      this.form = {
        name: is ? '' : this.nodeInfo.targetRuleChainId.id,
        description: is ? '' : this.nodeInfo.additionalInfo.description
      }
    }
  },
  async created () {
    await this.getRuleChains()
    this.init()
  }
}
</script>
