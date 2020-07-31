<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="资产类型">
          <el-select v-model="listQuery.type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in assetTypeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
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
      title="将资产分配给客户">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="实体列表" prop="id">
          <el-select multiple v-model="form.id">
            <el-option v-for="item in assetList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
          </el-select>
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
        { property: 'type', label: '资产类型', width: 150 },
        { property: 'label', label: '标签', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      visible: false,
      form: {
        id: []
      },
      rules: {
        id: [{ required: true, message: '实体列表不能为空', trigger: 'change' }]
      },
      assetTypeList: [],
      assetList: []
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        await Promise.all([
          this.form.id.map(item => this.$api.postCustomerAsset(this.customerId, item))
        ])
        this.visible = false
        this.getList()
      })
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/customers/${this.customerId}/assets/${row.id.id}`, query: { title: row.name } })
      }
    },
    remove (row) {
      this.$confirm('确认后，资产将未分配，客户无法访问', `您确定要取消对'${row.name}'资产的分配吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteCustomerAsset(row.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      }).catch(() => {})
    },
    async getAssetTypes () {
      const res = await this.$api.getAssetTypes()
      if (res.status === 200) {
        this.assetTypeList = res.data
      }
    },
    async getAssetInfos () {
      const res = await this.$api.getAssetInfos({
        pageSize: 999999,
        page: 0,
        sortProperty: 'name',
        sortOrder: 'ASC',
        type: ''
      })
      this.assetList = res.data.data
    },
    async getList () {
      const res = await this.$api.getCustomerAssetList(Object.assign({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.listQuery), this.customerId)
      this.list = (res.data.data && res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime)
      }))) || []
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
    this.getAssetTypes()
    this.getAssetInfos()
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
