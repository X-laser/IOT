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
          <span v-if="item.property === 'btn'" class="center">
            <el-button type="primary" size="mini">取消分配用户</el-button>
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
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
export default {
  props: ['customerId'],
  mixins: [page, resize],
  data () {
    return {
      listQuery: {},
      list: [],
      listTitle: [
        { property: 'name', label: '资产名', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ]
    }
  },
  methods: {
    cellClick (row, column) {
      if (column.label === '资产名') {
        this.$router.push({ path: `/customers/${this.customerId}/assets/${row.id.id}`, query: { title: row.name } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getList () {
      const res = await this.$api.getCustomerAssetList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.customerId)
      this.list = res.data.data && res.data.data
      this.total = res.data.totalElements
    }
  },
  created () {
    console.log(this.customerId)
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
