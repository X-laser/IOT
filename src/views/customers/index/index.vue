<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="success" @click="openDialog()">添加用户</el-button>
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
            <el-button v-if="!(scope.row.additionalInfo && scope.row.additionalInfo.isPublic)" type="text" @click="jumpRouter(scope.row, 'users')">管理用户账户</el-button>
            <el-button type="text" @click="jumpRouter(scope.row, 'assets')">管理用户资产</el-button>
            <el-button type="text" @click="jumpRouter(scope.row, 'devices')">管理用户设备</el-button>
            <el-button type="text" @click="jumpRouter(scope.row, 'dashboards')">管理用户应用</el-button>
            <el-button v-if="!(scope.row.additionalInfo && scope.row.additionalInfo.isPublic)" type="text" @click="del(scope.row)">删除用户</el-button>
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
      title="添加用户"
      :visible.sync="visible"
      width="616px">
      <el-form ref="form" :model="form" :rules="formRules" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="国家" prop="city">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="城市" prop="country">
            <el-input v-model="form.country"></el-input>
          </el-form-item>
          <el-form-item label="州" style="margin: 0 10px;" prop="state">
            <el-input v-model="form.state"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="zip">
            <el-input v-model="form.zip"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="地址2" prop="address2">
          <el-input v-model="form.address2"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button type="primary" @click="submit('form')">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
import { getDate } from '@/utils'
export default {
  mixins: [page, resize],
  data () {
    return {
      listQuery: {},
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'name', label: '标题', width: 150 },
        { property: 'email', label: '邮箱', width: 150 },
        { property: 'country', label: '国家', width: 150 },
        { property: 'city', label: '城市', width: 150 },
        { property: 'btn', label: '操作', width: 600 }
      ],
      visible: false,
      form: {
        title: '',
        description: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        address: '',
        address2: '',
        phone: '',
        email: ''
      },
      formRules: {
        title: [{ required: true, message: '标题不能为空' }],
        email: [
          { message: '请输入邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    del (row) {
      this.$confirm('小心！确认后,用户及其所有相关数据将不可恢复', `确定要删除用户'${row.name}'吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async _ => {
        const res = await this.$api.deleteCustomer(row.id.id)
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getList()
        }
      }).catch(() => {})
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/customers/${row.id.id}`, query: { title: row.name } })
      }
    },
    jumpRouter (row, path) {
      this.$router.push({ path: `/customers/${row.id.id}/${path}` })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    openDialog () {
      this.visible = true
    },
    submit (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const params = Object.assign({
          additionalInfo: { description: this.form.description }
        }, this.form)
        delete params.description
        const res = await this.$api.updateCustomer(params)
        if (res.status === 200) {
          this.$message.success('添加用户成功')
          this.visible = false
          this.getList()
        }
      })
    },
    async getList () {
      const res = await this.$api.getCustomersList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      })
      this.list = (res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime)
      }))) || []
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
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
