<template>
  <div class="alarm-container">
    <el-form :model="listQuery" size="mini" :inline="true">
      <el-form-item label="警告状态">
        <el-select v-model="listQuery.searchStatus" @change="getList">
          <el-option label="全部" value="ANY"></el-option>
          <el-option label="已激活" value="ACTIVE"></el-option>
          <el-option label="已清除" value="CLEARED"></el-option>
          <el-option label="已应答" value="ACK"></el-option>
          <el-option label="未应答" value="UNACK"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="listQuery.time"
          value-format="timestamp"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getList()"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @change="click()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-loading="loading"
      :default-sort="{prop: 'createdTime', order: 'descending'}"
      @sort-change="sortChange"
      size="mini"
      height="calc(100% - 88px)">
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
  props: ['entityId', 'info'],
  mixins: [page],
  data () {
    return {
      listQuery: {
        searchStatus: 'ANY',
        sortOrder: 'DESC',
        time: [
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 00:00:00`).getTime(),
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 23:59:59`).getTime()
        ]
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180, sortable: true },
        { property: 'server', label: '起因', width: 150 },
        { property: 'method', label: '类型', width: 100 },
        { property: 'error', label: '严重程度', width: 100 },
        { property: 'error', label: '状态', width: 100 },
        { property: 'error', label: '详情', width: 150 }
      ]
    }
  },
  methods: {
    sortChange ({ order }) {
      const isDesc = order === 'descending'
      this.listQuery.sortOrder = isDesc ? 'DESC' : 'ASC'
      this.getList()
    },
    async getList () {
      this.loading = true
      try {
        const time = this.listQuery.time || ['', '']
        const res = await this.$api.getAlarms('ENTITY_VIEW', this.entityId, {
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder,
          startTime: time[0],
          endTime: time[1],
          searchStatus: this.listQuery.searchStatus,
          fetchOriginator: true
        })
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
  watch: {
    info: {
      deep: true,
      handler (n) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .alarm-container {
    height: 100%;
  }
</style>
