<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="primary" @click="openDialog('add')">添加</el-button>
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
            <el-button type="primary" size="mini">打开</el-button>
            <el-button type="primary" size="mini" @click="exportDashboard(scope.row)">导出</el-button>
            <el-button v-if="!scope.row.private" type="primary" size="mini" @click="publicLink(scope.row)">设为公开</el-button>
            <el-button v-if="scope.row.private" type="primary" size="mini" @click="open(scope.row, 'private')">设为私有</el-button>
            <el-button type="primary" size="mini" @click="openDialog('manage', scope.row)">管理已分配的用户</el-button>
            <el-button type="danger" size="mini" @click="open(scope.row, 'remove')">删除</el-button>
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
      :title="title"
      :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 添加仪表板 -->
        <template v-if="tplType === 'add'">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </template>
        <!-- 管理已分配的客户 -->
        <template v-else-if="tplType === 'manage'">
          <el-form-item label="已分配的客户" prop="id">
            <el-select multiple filterable v-model="form.id">
              <el-option
                v-for="item in customerList"
                :key="item.id.id"
                :label="item.title"
                :value="item.id.id" />
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submit">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
    <icloud-dialog title="仪表板现已公布" width="800px" :visible.sync="publicVisble">
      <div class="link">
        <span>仪表板现已公布你的仪表板'{{publicInfo.name}}'已被公开，可通过如下<el-button
          type="text"
          class="active"
          @click="openLink">链接</el-button>访问:</span>
      </div>
      <div class="link-address">
        <code>{{ publicInfo.link }}</code>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
import { getDate } from '@/utils'
import FileSaver from 'file-saver'
export default {
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        sortOrder: 'DESC'
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180, sortable: true },
        { property: 'title', label: '标题', width: 150 },
        { property: 'customerName', label: '客户', width: 150 },
        { property: 'private', label: '公共', width: 150 },
        { property: 'btn', label: '操作', width: 400 }
      ],
      info: null,
      visible: false,
      title: '',
      tplType: '',
      form: {
        title: '',
        description: '',
        id: []
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }],
        id: [{ required: true, message: '已分配的客户不能为空', trigger: 'change' }]
      },
      customerList: [],
      publicVisble: false,
      publicInfo: {
        name: '',
        link: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        try {
          const isTpl = this.tplType === 'add'
          const params = isTpl ? {
            title: this.form.title,
            configuration: {
              description: this.form.description
            }
          } : this.form.id
          const apiName = isTpl ? 'postDashboard' : 'postDashboardCustomers'
          await this.$api[apiName](
            isTpl ? params : this.info.id.id, params
          )
          this.$message.success('操作成功')
          this.visible = false
          this.getList()
        } catch (error) {
          this.$message.error(error.response.data.message)
        }
      })
    },
    async exportDashboard (row) {
      try {
        const res = await this.$api.getDashboardInfos(row.id.id)
        const data = JSON.stringify({
          title: res.data.title,
          configuration: res.data.configuration,
          name: res.data.name
        }, null, 2)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, `${row.title}.json`)
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
    },
    openLink () {
      window.open(this.publicInfo.link)
    },
    open (row, type) {
      const info = {
        private: {
          tipMsg: `您确定要将仪表板'${row.name}'设为私有吗？`,
          msg: '确认后，仪表板将被设为私有，不能被其他人访问。',
          apiName: 'deletePublicDashboard'
        },
        remove: {
          tipMsg: `您确定要删除仪表板'${row.name}'吗？`,
          msg: '小心！确认后仪表板及其所有相关数据将不可恢复。',
          apiName: 'deleteDashboard'
        }
      }
      this.$confirm(info[type].msg, info[type].tipMsg, {
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(async _ => {
        try {
          await this.$api[info[type].apiName](row.id.id)
          this.$message.success('操作成功')
          this.getList()
        } catch (error) {
          this.$message.error(error.response.data.message)
        }
      }).catch(() => {})
    },
    async publicLink (row) {
      try {
        const res = await this.$api.postPublicDashboard(row.id.id)
        const publicId = res.data.assignedCustomers.filter(item => item.public)[0].customerId.id
        this.publicInfo = {
          name: row.title,
          link: `${window.IP_CONFIG.BASE_URL}/dashboard/${row.id.id}?publicId=${publicId}`
        }
        this.publicVisble = true
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
    },
    openDialog (tplType, info) {
      this.info = info
      this.tplType = tplType
      this.title = tplType === 'add' ? '添加仪表板' : '将资产分配给客户'
      this.visible = true
    },
    sortChange ({ order }) {
      const isDesc = order === 'descending'
      this.listQuery.sortOrder = isDesc ? 'DESC' : 'ASC'
      this.getList()
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/dashboards/${row.id.id}`, query: { title: row.title } })
      }
    },
    async getCustomersList () {
      const res = await this.$api.getCustomersList({
        pageSize: 9999999,
        page: 0,
        sortProperty: 'title',
        sortOrder: 'ASC'
      })
      this.customerList = res.data.data
    },
    async getList () {
      this.loading = true
      try {
        const res = await this.$api.getDashboardsList({
          page: this.page - 1,
          pageSize: this.limit,
          sortProperty: 'createdTime',
          sortOrder: this.listQuery.sortOrder
        })
        this.list = res.data.data.map(ele => {
          const isPrivate = !(!ele.assignedCustomers || !ele.assignedCustomers.some(item => item.public === true))
          return {
            ...ele,
            createdTime: getDate({ timestamp: ele.createdTime }),
            customerName: ele.assignedCustomers && ele.assignedCustomers.map(ele => ele.title).join(','),
            private: isPrivate
          }
        })
        this.total = res.data.totalElements
      } catch (error) {
        this.$message.error(error.response.data.message)
      }
      this.loading = false
    }
  },
  created () {
    this.getList()
    this.getCustomersList()
  },
  watch: {
    visible (n) {
      if (!n) {
        this.$refs.form.resetFields()
      }
    },
    publicVisble (n) {
      if (!n) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  font-size: 20px;
  padding: 0 5px;
}
.link {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
}
.link-address {
  code {
    margin: 20px 0;
    padding: 15px;
    display: inline-block;
    line-height: 1;
    color: #303030;
    font-size: 16px;
    font-family: monospace;
    font-weight: 700;
    background-color: #f7f7f7;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>
