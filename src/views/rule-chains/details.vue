<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">{{ formInfo.name }}</h3>
      <div class="details">规则链详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="DETAILS">
        <div class="button-container">
          <wx-button type="warning" @click="openRuleChain">OPEN RULE CHAIN</wx-button>
          <wx-button type="warning" v-if="!this.formInfo.root" @click="exportRuleChain">导出规则</wx-button>
          <wx-button type="warning" @click="openMessageBox('delete')">删除规则</wx-button>
          <wx-button type="warning" @click="copy">复制规则链ID</wx-button>
          <wx-button type="warning" v-if="!this.formInfo.root" @click="openMessageBox('root')">创建规则链根</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="debugMode">
            <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <wx-button type="primary" @click="submit">修改</wx-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="属性"></el-tab-pane>
      <el-tab-pane label="最新遥测"></el-tab-pane>
      <el-tab-pane label="警告"></el-tab-pane>
      <el-tab-pane label="事件"></el-tab-pane>
      <el-tab-pane label="关联"></el-tab-pane>
      <el-tab-pane label="审计日志"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
export default {
  props: ['id'],
  data () {
    return {
      form: {
        name: '',
        debugMode: false,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
      },
      formInfo: {}
    }
  },
  methods: {
    openRuleChain () {
      this.$router.push({ path: `/rule-chains/${this.id}`, query: { title: this.formInfo.name } })
    },
    async exportRuleChain (row) {
      const res = await Promise.all([
        this.$api.getRuleChainsInfo(this.id),
        this.$api.getRuleChainMetadata(this.id)
      ])
      if (res[0].status === 200 && res[1].status === 200) {
        const { additionalInfo, name, firstRuleNodeId, root, debugMode, configuration } = res[0].data
        const { firstNodeIndex, nodes, connections, ruleChainConnections } = res[1].data
        const data = JSON.stringify({
          ruleChain: { additionalInfo, name, firstRuleNodeId, root, debugMode, configuration },
          metadata: { firstNodeIndex, nodes, connections, ruleChainConnections }
        }, null, 2)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, `${this.formInfo.name}.json`)
      }
    },
    openMessageBox (type) {
      const title = {
        delete: `确定要删除规则链'${this.formInfo.name}'吗?`,
        root: '确定要生成规则链根吗?'
      }
      const message = {
        delete: '小心,在确认规则链和所有相关数据将变得不可恢复',
        root: '确认之后,规则链将变为根规格链,并将处理所有传入的传输消息'
      }
      this.$confirm(message[type], title[type], {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async _ => {
        let res = null
        switch (type) {
          case 'delete':
            res = await this.$api.deleteRuleChains(this.id)
            break
          case 'root':
            res = await this.$api.createRuleChainsRoot(this.id)
            break
          default:
            break
        }
        if (res.status === 200) {
          if (type === 'delete') {
            this.$router.push({ path: '/rule-chains' })
          } else {
            this.init()
          }
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(() => {})
    },
    copy () {
      const input = document.createElement('input')
      input.value = this.id
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.formInfo,
          name: this.form.name,
          debugMode: this.form.debugMode || false,
          additionalInfo: {
            ...this.formInfo.additionalInfo,
            description: this.form.description
          }
        }
        const res = await this.$api.postRuleChain(params)
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push(`/rule-chains/${this.id}/details?title=${this.form.name}`)
          this.init()
        }
      })
    },
    async init () {
      const res = await this.$api.getRuleChainsList({
        page: 0,
        pageSize: 999999
      })
      this.formInfo = res.data.data.filter(item => item.id.id === this.id)[0]
      console.log(this.formInfo)
      this.form = {
        name: this.formInfo.name,
        debugMode: this.formInfo.debugMode,
        description: this.formInfo.additionalInfo && this.formInfo.additionalInfo.description
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
