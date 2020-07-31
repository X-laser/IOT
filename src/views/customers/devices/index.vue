<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="设备类型">
          <el-select v-model="listQuery.type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in deviceTypeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="primary" @click="openDialog('add')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      size="mini"
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
            <el-button type="primary" size="mini" @click="remove(scope.row)">取消分配用户</el-button>
            <el-button type="primary" size="mini" @click="openDialog('credentials', scope.row)">管理凭据</el-button>
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
      :visible.sync="visible"
      :title="title">
      <el-form v-if="type === 'add'" ref="form" :model="form" :rules="rules">
        <el-form-item label="实体列表" prop="id">
          <el-select multiple v-model="form.id">
            <el-option v-for="item in deviceList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form v-else ref="form" :model="credentialsForm" :rules="credentialsRules">
        <el-form-item label="凭据类型" prop="credentialsType">
          <el-select v-model="credentialsForm.credentialsType">
            <el-option label="Access token" value="ACCESS_TOKEN"></el-option>
            <el-option label="X.509 Certificate" value="X509_CERTIFICATE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="RSA公钥" :prop="credentialsForm.credentialsType === 'ACCESS_TOKEN' ? 'credentialsId' : 'credentialsValue'">
          <el-input v-model="credentialsForm[credentialsForm.credentialsType === 'ACCESS_TOKEN' ? 'credentialsId' : 'credentialsValue']"></el-input>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submit">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
import { getDate } from '@/utils'
export default {
  props: ['customerId'],
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        type: ''
      },
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'name', label: '名称', width: 150 },
        { property: 'type', label: '设备类型', width: 150 },
        { property: 'label', label: '标签', width: 150 },
        { property: 'gateway', label: '是网关', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      visible: false,
      title: '',
      type: '',
      credentialsInfo: null,
      form: {
        id: []
      },
      rules: {
        id: [{ required: true, message: '实体列表不能为空', trigger: 'change' }]
      },
      deviceTypeList: [],
      deviceList: [],
      credentialsForm: {
        credentialsType: '',
        credentialsId: '',
        credentialsValue: ''
      },
      credentialsRules: {
        credentialsId: [{ required: true, message: '访问令牌不能为空', trigger: 'change' }],
        credentialsValue: [{ required: true, message: '访问令牌不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    async openDialog (type, params) {
      this.type = type
      if (type === 'credentials') {
        this.title = '设备凭据'
        const res = await this.$api.getDeviceCredentials(params.id.id)
        this.credentialsInfo = res.data
        this.credentialsForm = {
          credentialsType: res.data.credentialsType || 'ACCESS_TOKEN',
          credentialsId: res.data.credentialsId,
          credentialsValue: res.data.credentialsValue
        }
      } else {
        this.title = '将设备分配给客户'
      }
      this.visible = true
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        if (this.type === 'add') {
          await Promise.all([
            this.form.id.map(item => this.$api.postCustomerDevice(this.customerId, item))
          ])
        } else {
          const res = await this.$api.postDeviceCredentials({
            ...this.credentialsInfo,
            ...this.credentialsForm
          })
          if (res.status === 200) {
            this.$message.success('操作成功')
          }
        }
        this.visible = false
        this.getList()
      })
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/customers/${this.customerId}/devices/${row.id.id}`, query: { title: row.name } })
      }
    },
    remove (row) {
      this.$confirm('确认后,设备将被取消分配,客户将无法访问', `您确定要取消分配设备'${row.name}'?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerDevice(row.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      }).catch(() => {})
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getDeviceTypes () {
      const res = await this.$api.getDeviceTypes()
      if (res.status === 200) {
        this.deviceTypeList = res.data
      }
    },
    async getDeviceInfos () {
      const res = await this.$api.getDeviceInfo({
        pageSize: 999999,
        page: 0,
        sortProperty: 'name',
        sortOrder: 'ASC',
        type: ''
      })
      this.deviceList = res.data.data
    },
    async getList () {
      const res = await this.$api.getCustomerDeviceList(Object.assign({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.listQuery), this.customerId)
      this.list = (res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime),
        gateway: ele.additionalInfo.gateway || false
      }))) || []
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
    this.getDeviceTypes()
    this.getDeviceInfos()
  },
  watch: {
    visible (n) {
      if (!n) {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
