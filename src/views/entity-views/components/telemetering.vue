<template>
  <div class="telemetering-container">
    <el-form :model="listQuery" size="mini" :inline="true">
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
import { getDate } from '@/utils'
export default {
  props: ['entityId'],
  mixins: [page],
  data () {
    return {
      listQuery: {
        keyword: ''
      },
      listTitle: [
        { property: 'updatedTime', label: '最后更新时间', width: 180 },
        { property: 'key', label: '键', width: 180, sortable: true },
        { property: 'value', label: '值', width: 180 }
      ]
    }
  },
  computed: {
    list () {
      const { data } = this.$store.getters.websocketData || {}
      return (data && Object.keys(data).map(key => {
        return {
          updatedTime: getDate(data[key][0][0]),
          value: data[key][0][1],
          key
        }
      })) || []
    }
  },
  methods: {
    sortChange ({ order }) {}
  },
  created () {
    this.$store.dispatch('websocketsend', JSON.stringify({
      attrSubCmds: [],
      tsSubCmds: [
        {
          entityType: 'ENTITY_VIEW',
          entityId: this.entityId,
          scope: 'LATEST_TELEMETRY',
          cmdId: 1,
          unsubscribe: true
        }
      ],
      historyCmds: []
    }))
  }
}
</script>

<style lang="scss" scoped>
  .telemetering-container {
    height: 100%;
  }
</style>
