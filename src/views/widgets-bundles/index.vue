<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="primary" @click="visible = true">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      v-loading="loading"
      :default-sort="{prop: 'createdTime', order: 'descending'}"
      @sort-change="sortChange"
      size="mini"
      :height="mixinHeight - 20"
      :class="['configurationTable', {afterRenderClass: mixinShowAfterRenderClass}]"
      @cell-click="cellClick">
      <el-table-column
        type="selection"
        width="90">
      </el-table-column>
      <el-table-column
        v-for="item in listTitle"
        :key="item.label"
        :min-width="item.width"
        :label="item.label"
        :sortable="item.sortable"
        :prop="item.property"
        :sort-orders="['ascending', 'descending']"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.property === 'btn'" class="center">
            <el-button type="primary" size="mini">打开</el-button>
            <el-button type="primary" size="mini" @click="exportWidgetsBundle(scope.row)">导出</el-button>
            <el-button v-if="!scope.row.isSystem" type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
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
      title="添加部件包"
      :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submit">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
import { getDate } from '@/utils'
import FileSaver from 'file-saver'
export default {
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        sortOrder: 'DESC'
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180, sortable: true },
        { property: 'title', label: '标题', width: 150 },
        { property: 'isSystem', label: '系统', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      visible: false,
      form: {
        title: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit () {
      try {
        this.$refs.form.validate(async valid => {
          if (!valid) return false
          await this.$api.postWidgetsBundle(this.form)
          this.$message.success('操作成功')
          this.visible = false
          this.getList()
        })
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
    },
    remove (row) {
      this.$confirm('小心！确认后，部件包和所有相关数据将不可恢复。', `您确定要删除部件包 '${row.title}'吗？`, {
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(async _ => {
        try {
          await this.$api.deleteWidgetsBundle(row.id.id)
          this.$message.success('操作成功')
          this.getList()
        } catch (error) {
          this.$message.error(error.response.data.message)
        }
      }).catch(() => {})
    },
    async exportWidgetsBundle (row) {
      try {
        const result = await Promise.all([
          this.$api.getWidgetsBundleInfos(row.id.id),
          this.$api.getWidgetTypes({
            isSystem: row.isSystem,
            bundleAlias: row.alias
          })
        ])
        const { alias, title, image } = result[0].data
        const widgetTypes = (result[1].data || []).map(ele => {
          return {
            alias: ele.alias,
            name: ele.name,
            descriptor: ele.descriptor
          }
        })
        const data = JSON.stringify({
          widgetsBundle: {
            alias,
            title,
            image
          },
          widgetTypes
        }, null, 2)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, `${title}.json`)
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
    },
    sortChange ({ order }) {
      const isDesc = order === 'descending'
      this.listQuery.sortOrder = isDesc ? 'DESC' : 'ASC'
      this.getList()
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/widgets-bundles/${row.id.id}`, query: { title: row.title } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getList () {
      this.loading = true
      try {
        const res = await this.$api.getWidgetsBundlesList({
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder
        })
        const systemListId = [
          'cfe168d0-a952-11ea-8ea4-abf174381e63',
          'cfbb1c20-a952-11ea-8ea4-abf174381e63',
          'cfb3a210-a952-11ea-8ea4-abf174381e63',
          'cfaf5c50-a952-11ea-8ea4-abf174381e63',
          'cfaa2c30-a952-11ea-8ea4-abf174381e63',
          'cf97b5a0-a952-11ea-8ea4-abf174381e63',
          'cf9544a0-a952-11ea-8ea4-abf174381e63',
          'cf878900-a952-11ea-8ea4-abf174381e63',
          'cf76e730-a952-11ea-8ea4-abf174381e63',
          'cf6708b0-a952-11ea-8ea4-abf174381e63'
        ]
        this.list = res.data.data.map(ele => {
          return {
            ...ele,
            isSystem: systemListId.includes(ele.id.id),
            createdTime: getDate({ timestamp: ele.createdTime })
          }
        })
        this.total = res.data.totalElements
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
      this.loading = false
    }
  },
  created () {
    this.getList()
  },
  watch: {
    visible (n) {
      if (!n) {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
