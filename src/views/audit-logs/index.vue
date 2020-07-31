<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="时间">
          <el-date-picker
            v-model="listQuery.time"
            value-format="timestamp"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
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
      :class="['configurationTable', {afterRenderClass: mixinShowAfterRenderClass}]">
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
            <i class="el-icon-more" @click="openDialog(scope.row)"></i>
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
    <icloud-dialog title="审计日志详情" :visible.sync="visible">
      <el-form ref="form" :model="form">
        <el-form-item label="活动数据">
          <el-input type="textarea" autosize readonly v-model="form.actionData"></el-input>
        </el-form-item>
        <el-form-item label="失败详情" v-if="form.actionFailureDetails">
          <el-input type="textarea" autosize readonly v-model="form.actionFailureDetails"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="icloud-dialog-footer">
        <wx-button @click="visible = false">关闭</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import page from '@/mixins/page'
import resize from '@/mixins/resize'
import pickerOptions from '@/mixins/pickerOptions'
import { getDate } from '@/utils'
export default {
  mixins: [page, resize, pickerOptions],
  data () {
    return {
      listQuery: {
        sortOrder: 'DESC',
        time: [
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 00:00:00`).getTime(),
          new Date(`${getDate({ timestamp: new Date(), format: 'yyyy-MM-dd' })} 23:59:59`).getTime()
        ]
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180, sortable: true },
        { property: 'entityType', label: '实体类型', width: 150 },
        { property: 'entityName', label: '实体名称', width: 150 },
        { property: 'userName', label: '账户', width: 200 },
        { property: 'actionType', label: '类型', width: 200 },
        { property: 'actionStatus', label: '状态', width: 250 },
        { property: 'btn', label: '详情', width: 250 }
      ],
      visible: false,
      form: {
        actionData: {},
        actionFailureDetails: ''
      }
    }
  },
  methods: {
    sortChange ({ order }) {
      const isDesc = order === 'descending'
      this.listQuery.sortOrder = isDesc ? 'DESC' : 'ASC'
      this.getList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    openDialog (row) {
      this.visible = true
      this.form = {
        actionData: JSON.stringify(row.actionData, null, 4),
        actionFailureDetails: row.actionFailureDetails
      }
    },
    async getList () {
      this.loading = true
      try {
        const time = this.listQuery.time || ['', '']
        const res = await this.$api.getAuditLogsList({
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder,
          startTime: time[0],
          endTime: time[1]
        })
        this.list = res.data.data.map(ele => Object.assign(ele, {
          createdTime: getDate(ele.createdTime),
          entityType: ele.entityId.entityType
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
  }
}
</script>

<style lang="scss" scoped>
</style>
