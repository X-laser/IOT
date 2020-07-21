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
  RelatedAttributes,
  RelatedDeviceAttributes,
  TenantAttributes,
  TenantDetails,
  ChangeOriginator,
  TransformtionScript,
  ToEmail,
  Acknowledge,
  AssignToCustomer,
  Checkpoint,
  ClearAlarm,
  CopyToView,
  CreateAlarm,
  CreateRelation,
  Delay,
  DeleteRelation,
  Generator,
  GpsGeofencingEvents,
  Log,
  MessageCount,
  RpcCallReply,
  RpcCallRequest,
  SaveAttributes,
  SaveTimeseries,
  SaveToCustomTable,
  SynchronizationEnd,
  SynchronizationStart,
  UnassignFromCustomer,
  AwsSns,
  AwsSqs,
  GcpPubsub,
  Kafka,
  Mqtt,
  Rabbitmq,
  RestApiCall,
  SendEmail,
  RuleChain
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
    RelatedAttributes,
    RelatedDeviceAttributes,
    TenantAttributes,
    TenantDetails,
    ChangeOriginator,
    TransformtionScript,
    ToEmail,
    Acknowledge,
    AssignToCustomer,
    Checkpoint,
    ClearAlarm,
    CopyToView,
    CreateAlarm,
    CreateRelation,
    Delay,
    DeleteRelation,
    Generator,
    GpsGeofencingEvents,
    Log,
    MessageCount,
    RpcCallReply,
    RpcCallRequest,
    SaveAttributes,
    SaveTimeseries,
    SaveToCustomTable,
    SynchronizationEnd,
    SynchronizationStart,
    UnassignFromCustomer,
    AwsSns,
    AwsSqs,
    GcpPubsub,
    Kafka,
    Mqtt,
    Rabbitmq,
    RestApiCall,
    SendEmail,
    RuleChain
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

<style lang="scss" scope>
  .el-form {
    /deep/ .name-container {
      @include clearfix();
      .el-form-item {
        float: left;
        &:nth-of-type(1) {
          width: 440px;
        }
        &:nth-of-type(2) {
          margin-left: 10px;
          margin-top: 35px;
        }
      }
    }
    /deep/ .relation-container {
      @include clearfix();
      .el-form-item {
        float: left;
        &:nth-of-type(1) {
          width: 80px;
        }
        &:nth-of-type(2) {
          margin-left: 20px;
          width: 300px;
        }
      }
    }
    /deep/ .type-container {
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
    /deep/ .time-container, .circle-container {
      @include clearfix();
      .el-form-item {
        float: left;
        width: calc((100% - 10px) / 2);
        margin-right: 10px;
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
    /deep/ .desc {
      font-size: 12px;
      color: #808080;
    }
  }
</style>
