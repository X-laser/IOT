<template>
  <el-form ref="form" :model="form" :rules="rules">
    <div class="name-container">
      <el-form-item label="名称" prop="name">
        <el-input multiple v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="debugMode">
        <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
      </el-form-item>
    </div>
    <el-form-item prop="checkForSingleEntity">
      <el-checkbox v-model="form.checkForSingleEntity">Check relation to specific entity</el-checkbox>
    </el-form-item>
    <el-form-item label="方向" prop="direction">
      <el-select v-model="form.direction">
        <el-option lable="从" value="FORM"></el-option>
        <el-option lable="到" value="TO"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类型" prop="entityType" v-if="form.checkForSingleEntity">
      <el-select v-model="form.entityType" @change="change">
        <el-option label="设备" value="DEVICE"></el-option>
        <el-option label="资产" value="ASSET"></el-option>
        <el-option label="实体视图" value="ENTITY_VIEW"></el-option>
        <el-option label="租户" value="TENANT"></el-option>
        <el-option label="客户" value="CUSTOMER"></el-option>
        <el-option label="仪表板" value="DASHBOARD"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备" prop="entityId" v-if="form.checkForSingleEntity">
      <el-select v-model="form.entityId">
        <el-option v-for="item in types" :key="item.id.id" :label="item.name" :value="item.id.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="关联类型" prop="relationType">
      <el-select v-model="form.relationType">
        <el-option label="Contains" value="Contains"></el-option>
        <el-option label="Manages" value="Manages"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    nodeInfo: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '',
        debugMode: false,
        checkForSingleEntity: false,
        direction: '',
        entityType: '',
        entityId: '',
        relationType: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        direction: [{ required: true, message: '方向不能为空', trigger: 'change' }],
        entityType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        entityId: [{ required: true, message: '该项不能为空', trigger: 'change' }],
        relationType: [{ required: true, message: '关联类型', trigger: 'change' }]
      },
      types: []
    }
  },
  methods: {
    async change (value, init) {
      console.log(value)
      if (init !== 'init') {
        this.types = []
        this.form.entityId = ''
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
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            checkForSingleEntity: this.form.checkForSingleEntity,
            direction: this.form.direction,
            entityType: this.form.entityType,
            entityId: this.form.entityId,
            relationType: this.form.relationType
          },
          additionalInfo: {
            description: this.form.description
          },
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit'
        })
      })
    },
    async init () {
      console.log(this.nodeInfo)
      const { name, debugMode } = this.nodeInfo
      const { checkForSingleEntity, direction, entityType, entityId, relationType } = this.nodeInfo.configuration || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        checkForSingleEntity: checkForSingleEntity || false,
        direction: direction || 'FORM',
        entityType: entityType || '',
        entityId: entityId || '',
        relationType: relationType || '',
        description: description || ''
      }
      if (this.form.checkForSingleEntity) {
        this.change(this.form.entityType, 'init')
      }
      console.log(this.form)
    }
  },
  created () {
    this.init()
  }
}
</script>
