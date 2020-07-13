<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="实体视图类型">
          <el-select v-model="listQuery.type">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in entityViewTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
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
            <el-button type="primary" size="mini">实体视图设为公开</el-button>
            <el-button type="primary" size="mini">分配给用户</el-button>
            <el-button type="danger" size="mini">删除实体视图</el-button>
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
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        type: ''
      },
      entityViewTypes: [],
      list: [],
      listTitle: [
        { property: 'name', label: '名称', width: 150 },
        { property: 'type', label: '类型', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ]
    }
  },
  methods: {
    cellClick (row, column) {
      if (column.label === '名称') {
        this.$router.push({ path: `/entity-views/${row.id.id}`, query: { title: row.name } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getEntityViewTypes () {
      const res = await this.$api.getEntityViewTypes()
      this.entityViewTypes = res.data
    },
    async getList () {
      const res = await this.$api.getEntityViewList(Object.assign({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.listQuery))
      this.list = res.data.data
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
    this.getEntityViewTypes()
  }
}
</script>

<style lang="scss" scoped>
</style>
