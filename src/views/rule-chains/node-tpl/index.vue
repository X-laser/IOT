<template>
  <icloud-dialog :title="title" :visible.sync="visible">
    <component ref="comp" :is="compName" :nodeInfo="nodeInfo" @submit="save"></component>
    <div slot="footer" class="icloud-dialog-footer">
      <wx-button type="primary" @click="submit">确定</wx-button>
      <wx-button @click="visible = false">取消</wx-button>
    </div>
  </icloud-dialog>
</template>

<script>
import {
  CheckAlarmStatus,
  CheckExistenceFields,
  CheckRelation,
  GpsGeofencingFilter,
  MessageTypeSwitch,
  MessageType,
  OriginatorType,
  OriginatorTypeSwitch,
  JsScript,
  JsSwitch,
  CustomerAttributes,
  CustomerDetails,
  OriginatorFields,
  OriginatorAttributes,
  OriginatorTelemetry,
  RelatedAttributes
} from './index.js'
import ruleChainsTypes from './rule-chains-types.json'
export default {
  components: {
    CheckAlarmStatus,
    CheckExistenceFields,
    CheckRelation,
    GpsGeofencingFilter,
    MessageTypeSwitch,
    MessageType,
    OriginatorType,
    OriginatorTypeSwitch,
    JsScript,
    JsSwitch,
    CustomerAttributes,
    CustomerDetails,
    OriginatorFields,
    OriginatorAttributes,
    OriginatorTelemetry,
    RelatedAttributes
  },
  data () {
    return {
      visible: false,
      compName: '',
      title: '',
      nodeInfo: {}
    }
  },
  methods: {
    openDialog ({ nodeTpl, nodeInfo = {} }) {
      if (Object.prototype.hasOwnProperty.call(ruleChainsTypes, nodeTpl)) {
        this.nodeInfo = nodeInfo || {}
        this.visible = true
        this.title = Object.is(JSON.stringify(nodeInfo), '{}') ? '添加规则节点' : '修改规则节点'
        this.compName = ruleChainsTypes[nodeTpl]
      }
      console.log(nodeTpl, nodeInfo)
    },
    submit () {
      this.$refs.comp.submit()
    },
    save (form) {
      this.visible = false
      this.$emit('submit', form)
    }
  }
}
</script>
