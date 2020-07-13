<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      size="mini"
      border
      :height="mixinHeight"
      :class="['configurationTable', {afterRenderClass: mixinShowAfterRenderClass}]"
      @cell-click="cellClick">
      <el-table-column
        v-for="(item, index) in listTitle"
        :key="index"
        :min-width="item.width"
        :label="item.label"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.property === 'btn'" class="center"></span>
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
  </div>
</template>

<script>
import page from '@/mixins/page'
import resize from '@/mixins/resize'
import { getDate } from '@/utils'
export default {
  mixins: [page, resize],
  data () {
    return {
      listQuery: {},
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'title', label: '标题', width: 150 },
        { property: 'customerName', label: '客户', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ]
    }
  },
  methods: {
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/dashboards/${row.id.id}`, query: { title: row.title } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getList () {
      const res = await this.$api.getDashboardsList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      })
      this.list = res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime),
        customerName: ele.assignedCustomers && ele.assignedCustomers.map(ele => ele.title).join(',')
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
