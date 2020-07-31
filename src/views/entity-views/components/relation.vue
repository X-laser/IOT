<template>
  <div class="relation-container">
    <el-form :model="listQuery" size="mini" :inline="true">
      <el-form-item :label="listQuery.id === 'from' ? '向外的关联' : '向内的关联'">
        <el-select v-model="listQuery.id" @change="getList">
          <el-option label="从" value="from"></el-option>
          <el-option label="到" value="to"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="primary" @click="openDialog()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      size="mini"
      height="calc(100% - 126px)"
      :default-sort="{prop: 'type', order: 'descending'}"
      @sort-change="sortChange">
      <el-table-column
        type="selection"
        width="90">
      </el-table-column>
      <el-table-column
        v-for="item in listTitle[listQuery.id]"
        :key="item.label"
        :min-width="item.width"
        :label="item.label"
        :sortable="item.sortable"
        :prop="item.property"
        :sort-orders="['ascending', 'descending']"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="item.property === 'btn'" class="center">
            <el-button type="primary" size="mini" @click="openDialog(scope.row)">修改</el-button>
            <el-button type="primary" size="mini" @click="open(scope.row)">删除</el-button>
          </div>
          <span v-else>{{ scope.row[item.property] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <icloud-dialog
      :title="title"
      :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="关联类型" prop="type">
          <el-select
            v-model="form.type"
            filterable
            allow-create
            default-first-option
            :disabled="JSON.stringify(info) !== '{}'">
            <el-option label="Contains" value="Contains"></el-option>
            <el-option label="Manages" value="Manages"></el-option>
          </el-select>
        </el-form-item>
        <div class="type-container">
          <el-form-item label="类型" prop="entityType">
            <el-select v-model="form.entityType" @change="change" :disabled="JSON.stringify(info) !== '{}'">
              <el-option label="设备" value="DEVICE"></el-option>
              <el-option label="资产" value="ASSET"></el-option>
              <el-option label="实体视图" value="ENTITY_VIEW"></el-option>
              <el-option label="租户" value="TENANT"></el-option>
              <el-option label="客户" value="CUSTOMER"></el-option>
              <el-option label="仪表板" value="DASHBOARD"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.entityType" label="实体列表" prop="id">
            <el-select
              v-model="form.id"
              multiple
              filterable
              allow-create
              default-first-option
              :disabled="JSON.stringify(info) !== '{}'">
              <el-option v-for="item in types" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="附加信息" prop="additionalInfo" class="json-container">
          <Editor language="json"
            :codes="form.additionalInfo"
            @onCodeChange="$value => form.additionalInfo = $value" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="icloud-dialog-footer">
        <wx-button type="primary" @click="submit">确定</wx-button>
        <wx-button @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
export default {
  props: ['entityId'],
  components: { Editor },
  data () {
    return {
      listQuery: {
        id: 'to'
      },
      list: [],
      listTitle: {
        from: [
          { property: 'type', label: '类型', width: 180, sortable: true },
          { property: 'entityType', label: '到实体类型', width: 150 },
          { property: 'toName', label: '到实体名称', width: 150 },
          { property: 'btn', label: '详情', width: 100 }
        ],
        to: [
          { property: 'type', label: '类型', width: 180, sortable: true },
          { property: 'entityType', label: '从实体类型', width: 150 },
          { property: 'fromName', label: '从实体名称', width: 150 },
          { property: 'btn', label: '详情', width: 100 }
        ]
      },
      title: '',
      visible: false,
      form: {
        type: '',
        entityType: '',
        id: [],
        additionalInfo: ''
      },
      rules: {
        type: [{ required: true, message: '关联类型不能为空', trigger: 'change' }],
        entityType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        id: [{ required: true, message: '实体列表不能为空', trigger: 'change' }]
      },
      types: [],
      info: {}
    }
  },
  methods: {
    sortChange ({ order }) {},
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        const { type, entityType, id, additionalInfo } = this.form
        const isFrom = this.listQuery.id
        const params = id.map(ele => {
          return {
            ...this.info,
            type,
            additionalInfo: JSON.parse(additionalInfo),
            typeGroup: 'COMMON',
            from: {
              entityType: !isFrom ? 'ENTITY_VIEW' : entityType,
              id: !isFrom ? this.entityId : ele
            },
            to: {
              entityType: isFrom ? 'ENTITY_VIEW' : entityType,
              id: isFrom ? this.entityId : ele
            }
          }
        })
        await Promise.all([
          params.map(item => this.$api.postRelation(item))
        ])
        this.visible = false
        this.getList()
      })
    },
    open (row) {
      const isFrom = this.listQuery.id === 'from'
      this.$confirm(`确定删除后，当前实体将与实体 '${isFrom ? row.toName : row.fromName}' 取消关联`, `确定要从实体 '${isFrom ? row.toName : row.fromName}' 删除关联吗?`, {
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(async _ => {
        const params = {
          fromId: row.from.id,
          fromType: row.from.entityType,
          relationType: row.type,
          toId: row.to.id,
          toType: row.to.entityType
        }
        const res = await this.$api.deleteRelation(params)
        if (res.status === 200) {
          this.$message.success('删除关联成功')
          this.getList()
        }
      }).catch(() => {})
    },
    async openDialog (params = {}) {
      this.visible = true
      this.info = params
      const isParam = Object.is(JSON.stringify(params), '{}')
      this.title = isParam ? '添加关联' : '修改关联'
      const isFrom = this.listQuery.id === 'from'
      if (!isParam) {
        const id = isFrom ? params.to.id : params.from.id
        let apiName = ''
        let _params = null
        switch (isFrom ? params.to.entityType : params.from.entityType) {
          case 'DEVICE':
            apiName = 'getDevices'
            _params = { deviceIds: id }
            break
          case 'ASSET':
            apiName = 'getAssets'
            _params = { assetIds: id }
            break
          case 'ENTITY_VIEW':
            apiName = 'getEntityView'
            _params = id
            break
          case 'TENANT':
            apiName = 'getTenantInfos'
            _params = id
            break
          case 'CUSTOMER':
            apiName = 'getCustomersInfo'
            _params = id
            break
          case 'DASHBOARD':
            apiName = 'getDashboardInfo'
            _params = id
            break
          default:
            break
        }
        const res = await this.$api[apiName](_params)
        if (res.status === 200) {
          const data = Array.isArray(res.data) ? res.data[0] : res.data
          this.form = {
            type: params.type,
            entityType: data.id.entityType,
            id: [data.id.id],
            additionalInfo: params.additionalInfo === null ? '' : JSON.stringify(params.additionalInfo, null, 4)
          }
          if (this.form.entityType) {
            this.change(this.form.entityType, 'init')
          }
        }
      }
    },
    async change (value, init) {
      if (init !== 'init') {
        this.types = []
        this.form.id = []
      }
      let apiName = ''
      let params = {
        pageSize: 50,
        page: 0,
        sortProperty: 'name',
        sortOrder: 'ASC'
      }
      switch (value) {
        case 'DEVICE':
          apiName = 'getDeviceInfo'
          break
        case 'ASSET':
          apiName = 'getAssetInfos'
          break
        case 'ENTITY_VIEW':
          apiName = 'getEntityViewList'
          break
        case 'TENANT':
          apiName = 'getTenantInfos'
          params = 'e65c8de0-aa12-11ea-80f5-9b5ada2d0814'
          break
        case 'CUSTOMER':
          apiName = 'getCustomersList'
          params = {
            ...params,
            sortProperty: 'title'
          }
          break
        case 'DASHBOARD':
          apiName = 'getDashboardsList'
          params = {
            ...params,
            sortProperty: 'title'
          }
          break
        default:
          break
      }
      const res = await this.$api[apiName](params)
      if (value === 'TENANT') {
        this.types = [res.data]
      } else {
        this.types = res.data.data
      }
    },
    async getList () {
      const params = {
        toId: this.entityId,
        toType: 'ENTITY_VIEW',
        fromId: this.entityId,
        fromType: 'ENTITY_VIEW'
      }
      const isFrom = this.listQuery.id === 'from'
      if (isFrom) {
        delete params.toId
        delete params.toType
      } else {
        delete params.fromId
        delete params.fromType
      }
      const res = await this.$api.getRelationsInfo(params)
      this.list = (res.data && res.data.map(ele => Object.assign(ele, {
        entityType: isFrom ? ele.to.entityType : ele.from.entityType
      }))) || []
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

<style lang="scss" scope>
  .relation-container {
    height: 100%;
    .el-form {
      margin-bottom: 20px;
    }
  }
  .type-container {
    @include clearfix();
    .el-form-item {
      float: left;
      &:nth-of-type(1) {
        width: 150px;
      }
      &:nth-of-type(2) {
        margin-left: 20px;
        width: calc(100% - 170px);
      }
    }
  }
  .json-container {
    margin-top: 18px;
    .el-form-item__content {
      height: 300px;
      .editor-container {
        margin-top: 30px;
        height: 270px;
        .overflow-guard {
          border-radius: 4px;
          border: 1px solid #DCDFE6;
        }
      }
    }
  }
</style>
