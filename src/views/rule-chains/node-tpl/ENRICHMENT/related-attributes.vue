<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item
      label="名称"
      prop="name"
      :rules="[{ required: true, message: '名称不能为空', trigger: 'change' }]">
      <el-input multiple v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="debugMode">
      <el-checkbox v-model="form.debugMode">调试模式</el-checkbox>
    </el-form-item>
    <el-form-item label="关系查询"></el-form-item>
    <el-checkbox v-model="form.fetchLastLevelOnly">relation.last-level-relation</el-checkbox>
    <el-form-item label="方向" prop="direction" class="direction">
      <el-select v-model="form.direction">
        <el-option label="从" value="FORM"></el-option>
        <el-option label="去" value="TO"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="最大关联级别" prop="maxLevel">
      <el-input type="number" v-model="form.maxLevel" :min="1"></el-input>
    </el-form-item>
    <el-form-item label="属性映射" prop="filters">
      <ul class="attrMapping">
        <li>
          <span>类型</span>
          <span>实体类型</span>
          <i class="el-icon-circle-plus-outline" @click="add('filters')"></i>
        </li>
        <li v-for="(item, index) in form.filters" :key="index">
          <el-input v-model="item.relationType" :class="item.relationType ? '' : 'is-error'"></el-input>
          <el-select
            :class="item.entityTypes.length ? '' : 'is-error'"
            v-model="item.entityTypes"
            multiple
            filterable
            default-first-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <i class="el-icon-delete" @click="remove('filters', item)"></i>
        </li>
      </ul>
    </el-form-item>
    <el-form-item label="属性映射" prop="attrMapping" class="attrMapping-container">
      <el-checkbox v-model="form.telemetry">最新遥测</el-checkbox>
      <ul class="attrMapping">
        <li>
          <span>{{ form.telemetry ? '原遥测' :  '原属性'}}</span>
          <span>目标属性</span>
          <i class="el-icon-circle-plus-outline" @click="add('attrMapping')"></i>
        </li>
        <li v-for="(item, index) in form.attrMapping" :key="index">
          <el-input v-model="item.source" :class="item.source ? '' : 'is-error'"></el-input>
          <el-input v-model="item.target" :class="item.target ? '' : 'is-error'"></el-input>
          <i class="el-icon-delete" @click="remove('attrMapping', item)"></i>
        </li>
      </ul>
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
    const filters = (rule, value, callback) => {
      const filters = this.form.filters
      if (filters.length) {
        filters.forEach(item => {
          if (item.relationType === '') {
            callback(new Error('类型不能为空'))
          }
        })
        callback()
      } else {
        callback()
      }
    }
    const attrMapping = (rule, value, callback) => {
      const attrMapping = this.form.attrMapping
      const isTelemetry = this.form.telemetry
      if (attrMapping.length) {
        attrMapping.forEach(item => {
          if (item.source === '') {
            callback(new Error(`${isTelemetry ? '原遥测' : '原属性'}不能为空`))
          }
          if (item.target === '') {
            callback(new Error('目标属性不能为空'))
          }
        })
        callback()
      } else {
        callback(new Error('应至少指定一个属性映射'))
      }
    }
    const maxLevel = (rule, value, callback) => {
      if (Number(value) < 1 && value !== '') {
        callback(new Error('最大关联级别必须大于或等于1或为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        debugMode: '',
        fetchLastLevelOnly: '',
        direction: '',
        maxLevel: '',
        telemetry: '',
        filters: [],
        attrMapping: [],
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        direction: [{ required: true, message: '方向不能为空', trigger: 'change' }],
        filters: [{ required: true, validator: filters, trigger: 'change' }],
        attrMapping: [{ required: true, validator: attrMapping, trigger: 'change' }],
        maxLevel: [{ validator: maxLevel, trigger: 'change' }]
      },
      options: [
        { label: '设备', value: 'DEVICE' },
        { label: '资产', value: 'ASSET' },
        { label: '实体视图', value: 'ENTITY_VIEW' },
        { label: '设备管理员', value: 'TENANT' },
        { label: '用户', value: 'CUSTOMER' },
        { label: '应用', value: 'DASHBOARD' }
      ]
    }
  },
  methods: {
    add (type) {
      if (type === 'attrMapping') {
        this.form.attrMapping.push({
          source: '',
          target: ''
        })
      } else {
        this.form.filters.push({
          relationType: '',
          entityTypes: []
        })
      }
    },
    remove (list, item) {
      const index = this.form[list].indexOf(item)
      if (index !== -1) {
        this.form[list].splice(index, 1)
      }
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        const attrMapping = {}
        this.form.attrMapping.forEach(item => {
          attrMapping[item.source] = item.target
        })
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            telemetry: this.form.telemetry,
            attrMapping,
            relationsQuery: {
              direction: this.form.direction,
              maxLevel: this.form.maxLevel,
              filters: this.form.filters,
              fetchLastLevelOnly: this.form.fetchLastLevelOnly
            }
          },
          additionalInfo: {
            description: this.form.description
          },
          tplType: Object.is(JSON.stringify(this.nodeInfo), '{}') || 'edit'
        })
      })
    },
    init () {
      const { name, debugMode } = this.nodeInfo
      const {
        telemetry,
        attrMapping
      } = this.nodeInfo.configuration || {}
      const { direction, maxLevel, filters, fetchLastLevelOnly } = (this.nodeInfo.configuration && this.nodeInfo.configuration.relationsQuery) || {}
      let attrMap = []
      let defaultFilters = []
      if (JSON.stringify(this.nodeInfo) === '{}') {
        attrMap = [
          { source: 'temperature', target: 'tempo' }
        ]
        defaultFilters = [
          { relationType: 'Contains', entityTypes: [] }
        ]
      } else {
        for (const key in attrMapping) {
          attrMap.push({
            source: key,
            target: attrMapping[key]
          })
        }
        defaultFilters = filters
      }
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name: name || '',
        debugMode: debugMode || false,
        fetchLastLevelOnly: fetchLastLevelOnly || false,
        direction: direction || 'FORM',
        maxLevel,
        telemetry: telemetry || false,
        attrMapping: attrMap,
        filters: defaultFilters,
        description: description || ''
      }
      console.log(this.form)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .attrMapping-container {
    /deep/ .el-form-item__label {
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
    }
    &.is-error {
      /deep/ .attrMapping {
        .el-input {
          .el-input__inner {
            border-color: #DCDFE6;
            &:focus {
              border-color: #2DA7E0;
            }
            &:hover {
              border-color: #C0C4CC;
            }
          }
          &.is-error {
            .el-input__inner {
              border-color: #F56C6C;
            }
          }
        }
      }
    }
    .attrMapping {
      width: 100%;
      li {
        float: left;
        width: 100%;
        > span {
          float: left;
          width: 45%;
          text-align: center;
          font-size: 12px;
          color: rgba(0, 0, 0, .54);
          margin-bottom: 10px;
          margin-right: 10px;
        }
        .el-icon-circle-plus-outline {
          color: #67c23a;
          cursor: pointer;
        }
        .el-icon-delete {
          color: #f56c6c;
          cursor: pointer;
        }
        .el-input, .el-select {
          width: 45% !important;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
