<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="设备类型">
          <el-select v-model="listQuery.type">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in deviceTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="primary" @click="visible = true">添加</el-button>
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
            <el-button type="primary" size="mini">公开</el-button>
            <el-button type="primary" size="mini">分配给用户</el-button>
            <el-button type="primary" size="mini">管理凭据</el-button>
            <el-button type="danger" size="mini">删除设备</el-button>
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
    <icloud-dialog title="添加设备" :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="type">
          <el-select v-model="form.type">
            <el-option v-for="item in deviceTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item prop="gateway">
          <el-checkbox v-model="form.gateway">是网关</el-checkbox>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
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
  mixins: [page, resize],
  data () {
    return {
      listQuery: {
        type: ''
      },
      deviceTypes: [],
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'name', label: '名称', width: 150 },
        { property: 'type', label: '设备类型', width: 150 },
        { property: 'label', label: '标签', width: 150 },
        { property: 'customerTitle', label: '客户', width: 150 },
        { property: 'customerIsPublic', label: '公开', width: 150 },
        { property: 'gateway', label: '是网关', width: 150 },
        { property: 'btn', label: '操作', width: 450 }
      ],
      visible: false,
      form: {
        name: '',
        type: '',
        label: '',
        gateway: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        type: [{ required: true, message: '设备类型不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const params = {
          ...this.form,
          additionalInfo: {
            description: this.form.description,
            gateway: this.form.gateway
          }
        }
        delete params.description
        delete params.gateway
        const res = await this.$api.postDevice(params)
        if (res.status === 200) {
          this.$message.success('资产添加成功')
          this.visible = false
          this.getList()
        }
      })
    },
    cellClick (row, column) {
      if (column.label === '名称') {
        this.$router.push({ path: `/devices/${row.id.id}`, query: { title: row.name } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getDeviceTypes () {
      const res = await this.$api.getDeviceTypes()
      this.deviceTypes = res.data
    },
    async getList () {
      const res = await this.$api.getDeviceInfo(Object.assign({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.listQuery))
      this.list = res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime),
        gateway: ele.additionalInfo.gateway || false
      }))
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
    this.getDeviceTypes()
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
