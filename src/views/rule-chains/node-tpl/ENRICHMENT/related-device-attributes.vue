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
    <el-form-item label="设备关联查询"></el-form-item>
    <el-checkbox v-model="form.fetchLastLevelOnly">Fetch last level relation only</el-checkbox>
    <el-form-item label="方向" prop="direction" class="direction">
      <el-select v-model="form.direction">
        <el-option label="从" value="FORM"></el-option>
        <el-option label="去" value="TO"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="最大关联级别" prop="maxLevel">
      <el-input type="number" v-model="form.maxLevel" :min="1"></el-input>
    </el-form-item>
    <el-form-item label="关联类型" prop="relationType">
      <el-select
        v-model="form.relationType"
        filterable
        allow-create
        default-first-option>
        <el-option label="Contains" value="Contains"></el-option>
        <el-option label="Manages" value="Manages"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备类型" prop="deviceTypes">
      <el-select
        v-model="form.deviceTypes"
        multiple
        filterable
        allow-create
        default-first-option>
        <el-option label="Thermostat" value="Thermostat"></el-option>
        <el-option label="传感器" value="传感器"></el-option>
        <el-option label="室内温度计" value="室内温度计"></el-option>
        <el-option label="室外温度计" value="室外温度计"></el-option>
        <el-option label="恒温器" value="恒温器"></el-option>
        <el-option label="控制器" value="控制器"></el-option>
        <el-option label="温度传感器" value="温度传感器"></el-option>
        <el-option label="火灾报警设备" value="火灾报警设备"></el-option>
        <el-option label="烟雾传感器" value="烟雾传感器"></el-option>
        <el-option label="计数器" value="计数器"></el-option>
        <el-option label="设备类型1" value="设备类型1"></el-option>
      </el-select>
    </el-form-item>
    <el-checkbox v-model="form.tellFailureIfAbsent">Tell Failure</el-checkbox>
    <div class="desc">If at least one selected key doesn't exist the outbound message will report "Failure".</div>
    <el-form-item label="Clint attributes" prop="clientAttributeNames">
      <el-select
        v-model="form.clientAttributeNames"
        multiple
        filterable
        allow-create
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Shared attributes" prop="sharedAttributeNames">
      <el-select
        v-model="form.sharedAttributeNames"
        multiple
        filterable
        allow-create
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Server attributes" prop="serverAttributeNames">
      <el-select
        v-model="form.serverAttributeNames"
        multiple
        filterable
        allow-create
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Latest timeseries" prop="latestTsKeyNames">
      <el-select
        v-model="form.latestTsKeyNames"
        multiple
        filterable
        allow-create
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-checkbox v-model="form.getLatestValueWithTs"></el-checkbox>
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
        debugMode: '',
        fetchLastLevelOnly: false,
        direction: '',
        maxLevel: '',
        relationType: [],
        deviceTypes: [],
        tellFailureIfAbsent: false,
        clientAttributeNames: [],
        sharedAttributeNames: [],
        serverAttributeNames: [],
        latestTsKeyNames: [],
        getLatestValueWithTs: false,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        direction: [{ required: true, message: '方向不能为空', trigger: 'change' }],
        deviceTypes: [{ required: true, message: '设备类型不能为空', trigger: 'change' }]
      },
      options: []
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('submit', {
          debugMode: this.form.debugMode || false,
          name: this.form.name,
          configuration: {
            deviceRelationsQuery: {
              deviceRelationsQuery: this.form.deviceRelationsQuery,
              direction: this.form.direction,
              maxLevel: this.form.maxLevel,
              relationType: this.form.relationType,
              deviceTypes: this.form.deviceTypes,
              fetchLastLevelOnly: this.form.fetchLastLevelOnly
            },
            tellFailureIfAbsent: this.form.tellFailureIfAbsent || false,
            clientAttributeNames: this.form.clientAttributeNames,
            sharedAttributeNames: this.form.sharedAttributeNames,
            serverAttributeNames: this.form.serverAttributeNames,
            latestTsKeyNames: this.form.latestTsKeyNames,
            getLatestValueWithTs: this.form.getLatestValueWithTs
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
        tellFailureIfAbsent,
        clientAttributeNames,
        sharedAttributeNames,
        serverAttributeNames,
        latestTsKeyNames,
        getLatestValueWithTs
      } = this.nodeInfo.configuration || {}
      const { fetchLastLevelOnly, direction, maxLevel, relationType, deviceTypes } = (this.nodeInfo.configuration && this.nodeInfo.configuration.deviceRelationsQuery) || {} || {}
      const { description } = this.nodeInfo.additionalInfo || {}
      this.form = {
        name,
        debugMode: debugMode || false,
        fetchLastLevelOnly: fetchLastLevelOnly || false,
        direction: direction || 'FORM',
        maxLevel,
        relationType: relationType || [],
        deviceTypes: deviceTypes || [],
        tellFailureIfAbsent: tellFailureIfAbsent || false,
        clientAttributeNames: clientAttributeNames || [],
        sharedAttributeNames: sharedAttributeNames || [],
        serverAttributeNames: serverAttributeNames || [],
        latestTsKeyNames: latestTsKeyNames || [],
        getLatestValueWithTs: getLatestValueWithTs || false,
        description
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
  .desc {
    font-size: 12px;
    color: #808080;
  }
</style>
