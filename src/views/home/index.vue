<template>
  <div class="app-container">
    <div class="left-container">
      <div class="left-container-top">
        <div class="title">
          <span>资源概览</span>
        </div>
        <ul class="device-container">
          <li v-for="item in deviceList" :key="item.name">
            <span>
              <i class="iconfont" :class="item.icon"></i>
            </span>
            <span>{{ item.name }}</span>
            <span>{{ item.num }}</span>
          </li>
        </ul>
      </div>
      <div class="left-container-bottom">
        <div class="title">
          <span>数据服务</span>
        </div>
        <div class="bar">
          <echarts :option="require('@echarts/json/home/bar.json')"></echarts>
        </div>
        <div class="pie">
          <echarts :option="require('@echarts/json/home/pie.json')"></echarts>
        </div>
        <div class="line">
          <echarts :option="require('@echarts/json/home/line.json')"></echarts>
        </div>
        <div class="hollow-pie">
          <echarts :option="require('@echarts/json/home/hollow-pie.json')"></echarts>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="right-container-top">
        <div class="title">
          <span>设备数量</span>
          <el-select v-model="value" size="mini">
            <el-option label="全部" value=""></el-option>
          </el-select>
        </div>
        <ul>
          <li>
            <span>设备名称</span>
            <span>数量</span>
          </li>
          <li v-for="item in devList" :key="item.name">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </div>
      <div class="right-container-bottom">
        <div class="title">
          <span>最新告警</span>
          <a href="#">查看所有告警</a>
        </div>
        <ul>
          <li v-for="(item, index) in alarmList" :key="index">
            <i class="iconfont icon-alarm"></i>
            <span>{{ item.title }}</span>
            <span>{{ item.point }}</span>
            <span>{{ item.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from '@echarts'
export default {
  components: { Echarts },
  data () {
    return {
      deviceList: [
        { name: '当前设备告警数', num: 21, icon: 'icon-device-alarm' },
        { name: '在线设备数量', num: 8789, icon: 'icon-online-device' },
        { name: '设备模型', num: 172, icon: 'icon-device-model' },
        { name: '当月新增设备', num: 21, icon: 'icon-add-device' },
        { name: '当月下线设备', num: 21, icon: 'icon-offline-device' }
      ],
      value: '',
      devList: [
        { name: '温湿度传感器', value: 36 },
        { name: '室外传感器', value: 68 },
        { name: 'LORA基站', value: 14 },
        { name: 'GPS基站', value: 17 },
        { name: '交换机', value: 56 },
        { name: '水质雨量检测设备', value: 24 },
        { name: '蓝牙信标', value: 32 },
        { name: '蓝牙基站', value: 24 }
      ],
      alarmList: [
        { title: '温度超出平均温度5度以上', point: 'T3航站楼E372监测点', time: '12:23' },
        { title: 'PM2.5值超过阈值5%以上', point: 'T1航站楼E436监测点', time: '12:23' },
        { title: 'PM2.5值超过阈值5%以上', point: 'T1航站楼E436监测点', time: '12:23' },
        { title: 'PM2.5值超过阈值5%以上', point: 'T1航站楼E436监测点', time: '12:23' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.extend-title {
  position: relative;
  > span {
    &:first-child {
      line-height: 1;
      margin-top: 4px;
      margin-left: 32px;
      float: left;
      font-size: 22px;
      font-weight: bolder;
      font-family: PingFangSC-Medium;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 19px;
    height: 19px;
    background-color: #FFCC4F;
  }
}
.app-container {
  min-width: 1700px;
  height: calc(100% - 34px) !important;
  margin: 23px 0 0 20px;
  background-color: transparent;
  .left-container, .right-container {
    float: left;
  }
  .left-container {
    width: 1300px;
    .left-container-top, .left-container-bottom {
      .title {
        height: 30px;
        @extend .extend-title;
      }
    }
    .left-container-top {
      .device-container {
        height: 152px;
        margin-top: 15px;
        li {
          float: left;
          width: 240px;
          height: 163px;
          margin-left: 20px;
          background-color: #fff;
          position: relative;
          span {
            &:nth-of-type(1) {
              position: absolute;
              top: 28px;
              right: 15px;
              width: 60px;
              height: 40px;
              background-color: #6993FF;
              border-radius: 3px;
              display: flex;
              justify-content: center;
              align-items: center;
              .iconfont {
                font-size: 22px;
                color: #fff;
              }
            }
            &:nth-of-type(2), &:nth-of-type(3) {
              @include ellipsis();
              float: left;
              width: 100%;
            }
            &:nth-of-type(2) {
              margin: 31px 0 45px 0;
              font-size: 14px;
              font-weight: bold;
              color: #000;
              text-indent: 20px;
            }
            &:nth-of-type(3) {
              text-indent: 20px;
              font-size: 42px;
              font-family: PingFangSC-Medium;
              color: #374979;
            }
          }
          &:first-child {
            margin-left: 0;
          }
          &:nth-of-type(3) {
            margin-left: 23px;
          }
        }
      }
      @include clearfix();
    }
    .left-container-bottom {
      margin-top: 30px;
      .bar, .pie, .line, .hollow-pie {
        overflow: hidden;
        float: left;
        background-color: #fff;
      }
      .bar, .line {
        width: 880px;
        margin-right: 19px;
      }
      .pie, .hollow-pie {
        width: 381px;
      }
      .bar, .pie {
        height: 357px;
        margin-top: 17px;
        margin-bottom: 17px;
      }
      .line, .hollow-pie {
        height: 304px;
      }
    }
  }
  .right-container {
    width: 383px;
    margin-top: 45px;
    .right-container-top, .right-container-bottom {
      background-color: #fff;
      overflow: hidden;
      .title {
        margin-left: 20px;
        width: calc(100% - 20px - 21px);
        > span {
          &:first-child {
            line-height: 30px;
            float: left;
            font-size: 18px;
            font-weight: bolder;
            font-family: PingFangSC-Medium;
          }
        }
      }
    }
    .right-container-top {
      height: 516px;
      margin-bottom: 16px;
      .title {
        height: 30px;
        margin-top: 23px;
         /deep/ .el-select {
          width: 129px;
          float: right;
          .el-input__inner {
            height: 30px;
            line-height: 1;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            background-color: #6993FF;
          }
          .el-icon-arrow-up {
            font-weight: bolder;
            color: #fff;
          }
        }
      }
      ul {
        margin-top: 18px;
        margin-left: 20px;
        width: calc(100% - 20px - 21px);
        background-color: #fff;
        li {
          float: left;
          width: 100%;
          font-size: 16px;
          line-height: 22px;
          padding-bottom: 3px;
          border-bottom: 1px solid #E0E9FF;
          margin-top: 20px;
          span {
            float: left;
            font-weight: bold;
            &:first-child {
              width: calc(100% - 74px);
              text-indent: 13px;
              color: #6993FF;
            }
            &:nth-child(2) {
              width: 74px;
              text-align: center;
              color: #000000;
            }
          }
          &:first-child {
            line-height: 41px;
            background-color: #E5ECFF;
            border-bottom: none;
            margin-top: 0;
            padding-bottom: 0;
            span {
              color: #A6A6A6;
            }
          }
        }
      }
    }
    .right-container-bottom {
      height: 386px;
      .title {
        height: 24px;
        margin-top: 20px;
        a {
          float: right;
          margin-top: 7px;
          line-height: 1;
          color: #6993FF;
          font-size: 16px;
          font-weight: bold;
        }
      }
      ul {
        margin-top: 24px;
        margin-left: 20px;
        width: calc(100% - 20px - 19px);
        background-color: #fff;
        li {
          float: left;
          width: 100%;
          height: 68px;
          background-color: #F6F8FF;
          margin-bottom: 11px;
          position: relative;
          .icon-alarm {
            position: absolute;
            top: 16px;
            left: 15px;
            color: #6993FF;
            font-size: 18px;
          }
          span:nth-of-type(1), span:nth-of-type(2) {
            float: left;
            width: calc(100% - 43px - 52px);
            margin-left: 43px;
          }
          span:nth-of-type(1) {
            line-height: 22px;
            font-size: 16px;
            color: #000;
            margin-top: 16px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          span:nth-of-type(2) {
            line-height: 17px;
            font-size: 12px;
            color: #AEAEAE;
          }
          span:nth-of-type(3) {
            position: absolute;
            top: 19px;
            right: 20px;
            line-height: 17px;
            color: #979797;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
