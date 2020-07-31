<template>
  <div class="app-container details-container">
    <div class="btn-container">
      <wx-button type="primary" icon="iconiconfontcheck" circle @click="submit"></wx-button>
      <wx-button type="primary" icon="iconcuo" circle @click="$router.push({ path: `/customers/${$route.params.customerId}/dashboards` })"></wx-button>
    </div>
    <div class="title-container">
      <h3 class="title">{{ dashboardInfo.title }}</h3>
      <div class="details">仪表板详情</div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="详情">
        <div class="button-container">
          <wx-button type="warning" @click="openDashboard">打开仪表板</wx-button>
          <wx-button type="warning" @click="remove">取消分配客户</wx-button>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="审计日志">
        <el-form :model="listQuery" :inline="true" size="mini">
          <el-form-item label="时间">
            <el-date-picker
              v-model="listQuery.time"
              type="datetimerange"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="list"
          size="mini"
          height="calc(100% - 94px)">
          <el-table-column
            v-for="(item, index) in listTitle"
            :key="index"
            :min-width="item.width"
            :label="item.label"
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
      </el-tab-pane>
    </el-tabs>
    <icloud-dialog title="审计日志详情" :visible.sync="visible">
      <el-form :model="logForm">
        <el-form-item label="活动数据">
          <el-input type="textarea" autosize readonly v-model="logForm.actionData"></el-input>
        </el-form-item>
        <el-form-item label="失败详情" v-if="logForm.actionFailureDetails">
          <el-input type="textarea" autosize readonly v-model="logForm.actionFailureDetails"></el-input>
        </el-form-item>
      </el-form>
    </icloud-dialog>
  </div>
</template>

<script>
import { getDate } from '@/utils'
import { page } from '@/mixins'
export default {
  props: ['dashboardId'],
  mixins: [page],
  data () {
    return {
      dashboardInfo: {},
      form: {
        title: '',
        description: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }]
      },
      listQuery: {
        time: ''
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'userName', label: '用户', width: 150 },
        { property: 'actionType', label: '类型', width: 150 },
        { property: 'actionStatus', label: '状态', width: 150 },
        { property: 'btn', label: '详情', width: 250 }
      ],
      visible: false,
      logForm: {
        actionData: {},
        actionFailureDetails: ''
      }
    }
  },
  methods: {
    openDialog (row) {
      this.visible = true
      this.logForm = {
        actionData: JSON.stringify(row.actionData, null, 4),
        actionFailureDetails: row.actionFailureDetails
      }
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const res = await this.$api.postDashboard({
          ...this.dashboardInfo,
          configuration: {
            ...this.dashboardInfo.configuration,
            description: this.form.description
          },
          title: this.form.title
        })
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/dashboards/${this.dashboardId}?title=${this.form.title}` })
          this.getDashboardsInfo()
        }
      })
    },
    openDashboard () {
      this.$router.push({ path: `/customers/${this.$route.params.customerId}/dashboards/${this.dashboardInfo.id.id}/view`, query: { title: this.dashboardInfo.name } })
    },
    remove () {
      this.$confirm('确认后，面板将被取消分配，客户将无法访问', `您确定要取消分配仪表板'${this.dashboardInfo.name}'吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerDashboard(this.$route.params.customerId, this.dashboardInfo.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: `/customers/${this.$route.params.customerId}/dashboards` })
        }
      }).catch(() => {})
    },
    async getDashboardsInfo () {
      const res = await this.$api.getDashboardInfos(this.dashboardId)
      this.dashboardInfo = res.data
      this.form = {
        title: res.data.title,
        description: res.data.configuration.description
      }
    },
    async getList () {
      const res = await this.$api.getAuditLogsEntityDashboardList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC',
        startTime: (this.listQuery.time && this.listQuery.time[0]) || '',
        endTime: (this.listQuery.time && this.listQuery.time[1]) || ''
      }, this.dashboardId)
      this.list = (res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime)
      }))) || []
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getDashboardsInfo()
    this.getList()
  }
}
</script>

<style lang="scss" scope>
  .app-container {
    height: 100%;
  }
</style>
