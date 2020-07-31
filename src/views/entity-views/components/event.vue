<template>
  <div class="event-container">
    <el-form :model="listQuery" size="mini" :inline="true">
      <el-form-item label="事件类型">
        <el-select v-model="listQuery.eventType" @change="getList">
          <el-option label="错误" value="ERROR"></el-option>
          <el-option label="生命周期事件" value="LC_EVENT"></el-option>
          <el-option label="类型统计" value="STATS"></el-option>
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
        v-for="item in listTitle[listQuery.eventType]"
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
        eventType: 'ERROR',
        sortOrder: 'DESC',
        time: [
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 00:00:00`).getTime(),
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 23:59:59`).getTime()
        ]
      },
      list: [],
      listTitle: {
        ERROR: [
          { property: 'createdTime', label: '事件时间', width: 180, sortable: true },
          { property: 'server', label: '服务器', width: 150 },
          { property: 'method', label: '方法', width: 150 },
          { property: 'error', label: '错误', width: 150 }
        ],
        LC_EVENT: [
          { property: 'createdTime', label: '事件时间', width: 180, sortable: true },
          { property: 'server', label: '服务器', width: 150 },
          { property: 'event', label: '事件', width: 150 },
          { property: 'state', label: '状态', width: 150 },
          { property: 'error', label: '错误', width: 150 }
        ],
        STATS: [
          { property: 'createdTime', label: '事件时间', width: 180, sortable: true },
          { property: 'server', label: '服务器', width: 150 },
          { property: 'message', label: '消息处理', width: 150 },
          { property: 'error', label: '错误发生', width: 150 }
        ]
      }
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
        const res = await this.$api.getEvents('ENTITY_VIEW', this.entityId, this.listQuery.eventType, {
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder,
          tenantId: this.info.tenantId.id,
          startTime: time[0],
          endTime: time[1]
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
  .event-container {
    height: 100%;
  }
</style>
