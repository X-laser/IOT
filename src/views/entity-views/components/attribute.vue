<template>
  <div class="attribute-container">
    <el-form :model="listQuery" size="mini" :inline="true">
      <el-form-item label="设备属性范围">
        <el-select v-model="listQuery.scope">
          <el-option label="客户端属性" value="CLIENT_SCOPE"></el-option>
          <el-option label="服务端属性" value="SERVER_SCOPE"></el-option>
          <el-option label="共享属性" value="SHARED_SCOPE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listQuery.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-loading="loading"
      :default-sort="{prop: 'key', order: 'descending'}"
      @sort-change="sortChange"
      size="mini"
      height="calc(100% - 88px)">
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
import { page } from '@/mixins'
export default {
  props: ['entityId'],
  mixins: [page],
  data () {
    return {
      listQuery: {
        scope: 'CLIENT_SCOPE',
        keyword: ''
      },
      list: [],
      listTitle: [
        { property: 'updatedTime', label: '最后更新时间', width: 180 },
        { property: 'key', label: '键', width: 180, sortable: true },
        { property: 'value', label: '值', width: 180 }
      ]
    }
  },
  methods: {
    sortChange ({ order }) {},
    async getList () {
      const res = await this.$api.getAttribute('ENTITY_VIEW', this.entityId, this.listQuery.scope)
      if (res.status === 200) {
        this.list = res.data
        this.total = this.list.length
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .attribute-container {
    height: 100%;
  }
</style>
