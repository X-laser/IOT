<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item label="实体视图类型">
          <el-select v-model="listQuery.type">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in entityViewTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
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
            <el-button v-if="!scope.row.customerIsPublic && !scope.row.customerTitle" type="text" @click="open(scope.row, 'public')">资产设为公开</el-button>
            <el-button v-if="!scope.row.customerTitle" type="text" @click="openDialog('allocation', scope.row)">分配给客户</el-button>
            <el-button v-if="!scope.row.customerIsPublic && scope.row.customerTitle" type="text" @click="open(scope.row, 'allocation')">取消分配客户</el-button>
            <el-button v-if="scope.row.customerIsPublic" type="text" @click="open(scope.row, 'private')">资产设为私有</el-button>
            <el-button type="text" @click="open(scope.row, 'delete')">删除</el-button>
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
      <el-form v-if="type === 'add'" ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="实体视图类型" prop="type">
          <el-select
            filterable
            allow-create
            default-first-option
            v-model="form.type">
            <el-option v-for="item in entityViewTypes" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="targer-entity" label="目标实体"></el-form-item>
        <div class="entity-container">
          <el-form-item label="类型" prop="entityType">
            <el-select v-model="form.entityType" @change="typeChange">
              <el-option label="设备" value="DEVICE"></el-option>
              <el-option label="资产" value="ASSET"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.entityType" :label="form.entityType === 'DEVICE' ? '设备' : '资产'" prop="id">
            <el-select v-model="form.id">
              <el-option v-for="item in typeList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-collapse v-model="activeName">
          <el-collapse-item title="属性传播" name="1">
            <div class="desc">每次保存或更新这个实体视图时，实体视图将自动从目标实体复制指定的属性。由于性能原因，目标实体属性不会在每次属性更改时传播到实体视图。您可以通过配置"copy to view"规则链中的规则节点，并将"Post attributes"和"attributes Updated"消息链接到新规则节点，从而启用自动传播。</div>
            <el-form-item label="客户端属性" prop="cs">
              <el-select
                multiple
                filterable
                allow-create
                default-first-option
                v-model="form.cs">
                <el-option label="inactivityAlarmTime" value="inactivityAlarmTime"></el-option>
                <el-option label="active" value="active"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="共享属性" prop="sh">
              <el-select
                multiple
                filterable
                allow-create
                default-first-option
                v-model="form.sh">
                <el-option label="inactivityAlarmTime" value="inactivityAlarmTime"></el-option>
                <el-option label="active" value="active"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务端属性" prop="ss">
              <el-select
                multiple
                filterable
                allow-create
                default-first-option
                v-model="form.ss">
                <el-option label="inactivityAlarmTime" value="inactivityAlarmTime"></el-option>
                <el-option label="active" value="active"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="时间序列数据" name="2">
            <div class="desc">配置目标实体的时间序列数据键,以便实体视图可以访问这些键。这个时间序列数据是只读的。</div>
            <el-form-item label="时间序列" prop="timeseries">
              <el-select
                multiple
                filterable
                allow-create
                default-first-option
                v-model="form.timeseries">
                <el-option label="humidity" value="humidity"></el-option>
                <el-option label="temp" value="temp"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <div class="time-container">
          <el-form-item label="开始时间" prop="startTimeMs">
            <el-date-picker
              v-model="form.startTimeMs"
              type="datetime"
              placeholder="开始时间"
              value-format="timestamp"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTimeMs">
            <el-date-picker
              v-model="form.endTimeMs"
              type="datetime"
              placeholder="结束时间"
              value-format="timestamp"
              align="right">
            </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else ref="form" :model="allocationForm" :rules="allocationRules">
        <el-form-item label="客户" prop="id">
          <el-select v-model="allocationForm.id">
            <el-option v-for="item in customerList" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
          </el-select>
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
import { page, resize } from '@/mixins'
import { getDate } from '@/utils'
export default {
  mixins: [page, resize],
  data () {
    const id = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error(`${this.form.entityType === 'DEVICE' ? '设备' : '资产'}不能为空`))
      } else {
        callback()
      }
    }
    return {
      listQuery: {
        type: ''
      },
      entityViewTypes: [],
      list: [],
      listTitle: [
        { property: 'createdTime', label: '创建时间', width: 180 },
        { property: 'name', label: '名称', width: 150 },
        { property: 'type', label: '实体视图类型', width: 150 },
        { property: 'customerTitle', label: '客户', width: 150 },
        { property: 'customerIsPublic', label: 'Public', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      activeName: ['1', '2'],
      visible: false,
      type: '',
      title: '',
      form: {
        name: '',
        type: '',
        entityType: '',
        id: '',
        startTimeMs: '',
        endTimeMs: '',
        cs: [],
        sh: [],
        ss: [],
        timeseries: [],
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigget: 'change' }],
        type: [{ required: true, message: '实体视图类型不能为空', trigget: 'change' }],
        entityType: [{ required: true, message: '类型不能为空', trigget: 'change' }],
        id: [{ required: true, validator: id, trigget: 'change' }]
      },
      allocationForm: {
        id: ''
      },
      allocationRules: {
        id: [{ required: true, message: '客户不能为空', trigget: 'change' }]
      },
      customerList: [],
      typeList: [],
      info: null
    }
  },
  methods: {
    open (row, type) {
      const info = {
        public: {
          title: `你确定你想创建公开'${row.name}'实体视图?`,
          msg: '确认后，实体视图 及其所有数据将被公开并被他人访问'
        },
        allocation: {
          title: `你确定要取消对'${row.name}'实体视图的分配吗?`,
          msg: '确认后，实体视图将未分配，客户无法访问'
        },
        private: {
          title: `你确定你想创建私有'${row.name}'实体视图?`,
          msg: '确认后，实体视图及其所有数据将被私有化，无法被他人访问'
        },
        delete: {
          title: `确定要删除实体视图'${row.name}'?`,
          msg: '小心！确认后实体视图及其所有相关数据将不可恢复'
        }
      }
      this.$confirm(info[type].msg, info[type].title, {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async _ => {
        let apiName = ''
        if (type === 'public') {
          apiName = 'postCustomerPublicEntityView'
        } else if (type === 'allocation' || type === 'private') {
          apiName = 'deleteCustomerEntityView'
        } else if (type === 'delete') {
          apiName = 'deleteEntityView'
        }
        const res = await this.$api[apiName](row.id.id)
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      }).catch(() => {})
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        if (this.type === 'add') {
          const { ..._params } = this.form
          const params = {
            name: _params.name,
            type: _params.type,
            entityId: {
              entityType: _params.entityType,
              id: _params.id
            },
            startTimeMs: _params.startTimeMs,
            endTimeMs: _params.endTimeMs,
            keys: {
              attributes: {
                cs: _params.cs,
                sh: _params.sh,
                ss: _params.ss
              },
              timeseries: _params.timeseries
            },
            additionalInfo: {
              description: _params.description
            }
          }
          const res = await this.$api.postEntityView(params)
          if (res.status === 200) {
            this.$message.success('添加成功')
            this.visible = false
            this.init()
          }
        } else {
          const res = await this.$api.postCustomerEntityView(this.allocationForm.id, this.info.id.id)
          if (res.status === 200) {
            this.$message.success('分配成功')
            this.visible = false
            this.init()
          }
        }
      })
    },
    openDialog (type, info) {
      this.visible = true
      this.type = type
      this.info = info
      this.title = type === 'add' ? '添加实体视图' : '将实体视图分配给客户'
    },
    async typeChange (value) {
      this.form.id = ''
      this.typeList = []
      let apiName = ''
      const params = {
        pageSize: 999999,
        page: 0,
        sortProperty: 'name',
        sortOrder: 'ASC',
        type: ''
      }
      if (value === 'DEVICE') {
        apiName = 'getDeviceInfo'
      } else if (value === 'ASSET') {
        apiName = 'getAssetInfos'
      } else {
        return false
      }
      const res = await this.$api[apiName](params)
      this.typeList = res.data.data
    },
    cellClick (row, column) {
      if (column.label !== '操作') {
        this.$router.push({ path: `/entity-views/${row.id.id}`, query: { title: row.name } })
      }
    },
    async getEntityViewTypes () {
      const res = await this.$api.getEntityViewTypes()
      this.entityViewTypes = res.data
    },
    async getCustomersList () {
      const res = await this.$api.getCustomersList({
        pageSize: 999999,
        page: 0,
        sortProperty: 'title',
        sortOrder: 'ASC'
      })
      this.customerList = res.data.data
    },
    async getList () {
      const res = await this.$api.getEntityViewList(Object.assign({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.listQuery))
      this.list = res.data.data.map(ele => Object.assign(ele, {
        createdTime: getDate(ele.createdTime)
      }))
      this.total = res.data.totalElements
    },
    init () {
      this.getList()
      this.getEntityViewTypes()
      this.getCustomersList()
    }
  },
  created () {
    this.init()
  },
  watch: {
    visible (val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.desc {
  font-size: 12px;
  color: #808080;
}
.targer-entity {
  margin-bottom: 0 !important;
}
.entity-container {
  @include clearfix();
  .el-form-item {
    float: left;
    margin-bottom: 19px !important;
    &:nth-of-type(1) {
      width: 100px;
    }
    &:nth-of-type(2) {
      margin-left: 20px;
      width: calc(100% - 120px);
    }
  }
}
.time-container {
  @include clearfix();
  .el-form-item {
    float: left;
    width: calc(100% / 2);
  }
}
/deep/ .el-collapse {
  border: none;
  .el-collapse-item {
    border: none;
    .el-collapse-item__header {
      border: none;
    }
    .el-collapse-item__wrap {
      border: 1px solid #D5D5D5;
      border-top: none;
      border-radius: 0 0 4px 4px;
      margin-bottom: 18px;
    }

    > div {
      padding: 0 20px;
      &:nth-of-type(1) {
        border: 1px solid #D5D5D5;
      }
    }
    &:first-child {
      > div {
        &:nth-of-type(1) {
          border-bottom: none;
        }
      }
      .el-collapse-item__wrap {
        margin-bottom: 18px;
      }
    }
    &:last-child {
      margin-bottom: 18px;
    }
    &.is-active {
      > div {
        &:nth-of-type(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
