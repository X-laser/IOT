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
      :height="mixinHeight"
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
            <el-button type="primary" size="mini" @click="openDashboard(scope.row)">打开仪表板</el-button>
            <el-button type="primary" size="mini" @click="exportDashboard(scope.row.id.id)">导出仪表板</el-button>
            <el-button type="primary" size="mini" @click="remove(scope.row)">取消分配用户</el-button>
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
      :visible.sync="visible"
      title="将仪表板分配给客户">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="实体列表" prop="id">
          <el-select multiple v-model="form.id">
            <el-option v-for="item in dashboardsList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
          </el-select>
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
  props: ['customerId'],
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        sortOrder: 'DESC'
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 150, sortable: true },
        { property: 'name', label: '标题', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      visible: false,
      form: {
        id: []
      },
      rules: {
        id: [{ required: true, message: '实体列表不能为空', trigger: 'change' }]
      },
      dashboardsList: []
    }
  },
  methods: {
    sortChange ({ order }) {
      const isDesc = order === 'descending'
      this.listQuery.sortOrder = isDesc ? 'DESC' : 'ASC'
      this.getList()
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        await Promise.all([
          this.form.id.map(item => this.$api.postCustomerDashboard(this.customerId, item))
        ])
        this.visible = false
        this.getList()
      })
    },
    async exportDashboard (id) {
      const res = await this.$api.getDashboardInfos(id)
      if (res.status === 200) {
        const data = JSON.stringify({
          title: res.data.title,
          configuration: res.data.configuration,
          name: res.data.name
        }, null, 2)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, `${res.data.name}.json`)
      }
    },
    remove (row) {
      this.$confirm('确认后，面板将被取消分配，客户将无法访问', `您确定要取消分配仪表板'${row.name}'吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerDashboard(this.customerId, row.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      }).catch(() => {})
    },
    openDashboard (row) {
      this.$router.push({ path: `/customers/${this.customerId}/dashboards/${row.id.id}/view`, query: { title: row.name } })
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/customers/${this.customerId}/dashboards/${row.id.id}/info`, query: { title: row.name } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getDashboardsList () {
      const res = await this.$api.getDashboardsList({
        pageSize: 999999,
        page: 0,
        sortProperty: 'title',
        sortOrder: 'ASC'
      })
      if (res.status === 200) {
        this.dashboardsList = res.data.data
      }
    },
    async getList () {
      this.loading = true
      try {
        const res = await this.$api.getCustomerDashboardList({
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder
        }, this.customerId)
        this.list = res.data.data.map(ele => Object.assign(ele, {
          createdTime: getDate({ timestamp: ele.createdTime })
        }))
        this.total = res.data.totalElements
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
      this.loading = false
    }
  },
  created () {
    this.getList()
    this.getDashboardsList()
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
