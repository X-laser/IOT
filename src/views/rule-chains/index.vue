<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="success" @click="openDialog({ title: '添加规则' })">添加规则</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      size="mini"
      :height="mixinHeight"
      :class="['configurationTable', {afterRenderClass: mixinShowAfterRenderClass}]"
      @cell-click="cellClick">
      <el-table-column
        type="selection"
        width="90">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in listTitle"
        :key="index"
        :min-width="item.width"
        :label="item.label"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.property === 'btn'" class="center">
            <el-button size="mini" @click="$router.push({ path: `/rule-chains/${scope.row.id.id}`, query: { title: scope.row.name } })">规则链</el-button>
            <el-button type="primary" size="mini" @click="openDialog({ type: 'edit', title: `修改${scope.row.name}`, params: { ...scope.row, index: scope.$index + 1 } })">修改</el-button>
            <el-button v-if="!scope.row.root" type="primary" size="mini" @click="exportRuleChain(scope.row)">导出规则</el-button>
            <el-button v-if="!scope.row.root" type="primary" size="mini" @click="openMessageBox({ type: 'root', params: scope.row })">创建规则链根</el-button>
            <el-button type="danger" size="mini" @click="openMessageBox({ type: 'delete', params: scope.row })">删除规则</el-button>
          </span>
          <span v-else>{{ scope.row[item.property] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      ref="pagination"
      @size-change="getList()"
      @current-change="getList()"
      :current-page.sync="page"
      background
      :page-sizes="sizes"
      :page-size.sync="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <icloud-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      @close="resetForm('form')">
      <el-form ref="form" :model="dialog.form" :rules="dialog.formRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialog.form.name"></el-input>
        </el-form-item>
        <el-form-item prop="debugMode">
          <el-checkbox v-model="dialog.form.debugMode">调试模式</el-checkbox>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="dialog.form.description"></el-input>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submitForm('form')">确定</wx-button>
        <wx-button @click="dialog.visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import page from '@/mixins/page'
import resize from '@/mixins/resize'
import FileSaver from 'file-saver'
import { getDate } from '@/utils'
export default {
  mixins: [page, resize],
  data () {
    return {
      listQuery: {},
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'name', label: '名称', width: 150 },
        { property: 'root', label: '根实体', width: 100 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      dialog: {
        visible: false,
        width: '',
        title: '',
        type: '',
        form: {
          name: '',
          debugMode: false,
          description: ''
        },
        formRules: {
          name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
        }
      },
      info: {}
    }
  },
  methods: {
    cellClick (row, column) {
      if (column.label !== '操作' && column.type !== 'selection') {
        this.$router.push({ path: `/rule-chains/${row.id.id}/details`, query: { title: row.name } })
      }
    },
    async exportRuleChain (row) {
      const res = await Promise.all([
        this.$api.getRuleChainsInfo(row.id.id),
        this.$api.getRuleChainMetadata(row.id.id)
      ])
      if (res[0].status === 200 && res[1].status === 200) {
        const { additionalInfo, name, firstRuleNodeId, root, debugMode, configuration } = res[0].data
        const { firstNodeIndex, nodes, connections, ruleChainConnections } = res[1].data
        const data = JSON.stringify({
          ruleChain: { additionalInfo, name, firstRuleNodeId, root, debugMode, configuration },
          metadata: { firstNodeIndex, nodes, connections, ruleChainConnections }
        }, null, 2)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, `${row.name}.json`)
      }
    },
    openMessageBox ({ type, params }) {
      const title = {
        delete: `确定要删除规则链'${params.name}'吗?`,
        root: '确定要生成规则链根吗?'
      }
      const message = {
        delete: '小心,在确认规则链和所有相关数据将变得不可恢复',
        root: '确认之后,规则链将变为根规格链,并将处理所有传入的传输消息'
      }
      this.$confirm(message[type], title[type], {
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(async _ => {
        let res = null
        switch (type) {
          case 'delete':
            res = await this.$api.deleteRuleChains(params.id.id)
            break
          case 'root':
            res = await this.$api.createRuleChainsRoot(params.id.id)
            break
          default:
            break
        }
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.getList()
        } else {
          this.$message.error('操作失败')
        }
      }).catch(() => {})
    },
    openDialog ({ type, params, title }) {
      this.dialog.visible = true
      this.dialog.title = title
      this.dialog.type = type
      this.info = params
      if (type === 'edit') {
        for (const key in this.dialog.form) {
          if (key === 'description') {
            this.dialog.form.description = (params.additionalInfo && params.additionalInfo.description) || ''
          } else {
            this.dialog.form[key] = params[key]
          }
        }
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { name, debugMode, description } = this.dialog.form
        let params = { name, debugMode, additionalInfo: { description } }
        if (this.dialog.type === 'edit') {
          const { id, createdTime, tenantId, firstRuleNodeId, root, configuration, index } = this.info
          params = Object.assign(params, { id, createdTime, tenantId, firstRuleNodeId, root, configuration, index })
        }
        const res = await this.$api.updateRuleChain(params)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.dialog.visible = false
          this.getList()
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getList () {
      const res = await this.$api.getRuleChainsList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      })
      this.list = res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime)
      }))
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
