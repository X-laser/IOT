<template>
  <transition name="dialog-fade">
    <div class="icloud-dialog__wrapper" v-if="visible">
      <div class="icloud-dialog" ref="icloudDialog" :style="{ width, minWidth: width }" >
        <div class="icloud-dialog__header" ref="icloudDialogHeader">
          <span class="icloud-dialog__title">{{ title }}</span>
          <button type="button" class="icloud-dialog__headerbtn" @click="handleClose">
            <i class="icloud-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="icloud-dialog__body" ref="icloudDialogBody" :style="icloudDialogBodyStyle">
          <slot></slot>
        </div>
        <div class="icloud-dialog__footer" ref="icloudDialogFooter" v-if="$slots.default">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'IcloudDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '580px'
    }
  },
  data () {
    return {
      icloudDialogBodyStyle: {}
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    init () {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      const icloudDialogHeaderHeight = this.$refs.icloudDialogHeader.offsetHeight
      const icloudDialogFooterHeight = this.$refs.icloudDialogFooter.offsetHeight
      const maxHeight = clientHeight - icloudDialogHeaderHeight - icloudDialogFooterHeight - 100
      this.icloudDialogBodyStyle = { maxHeight: maxHeight + 'px' }
    }
  },
  watch: {
    visible (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.init()
        })
        document.body.appendChild(this.$el)
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .icloud-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(29, 29, 29, 0.27);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    .icloud-dialog {
      position: relative;
      box-shadow: 0px 13px 61px 0px rgba(169, 169, 169, 0.37);
      .icloud-dialog__header {
        height: 77px;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #D5D5D5;
        border-radius: 18px 18px 0 0;
        .icloud-dialog__title {
          position: relative;
          display: inline-block;
          line-height: 30px;
          margin-top: 29px;
          font-size: 22px;
          font-family: PingFangSC-Medium;
          font-weight: bolder;
          color: #000;
          overflow: hidden;
          &:first-child {
            margin-left: 29px;
          }
          &.btn {
            cursor: pointer;
          }
        }
        .icloud-dialog__headerbtn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #6993FF;
          position: absolute;
          right: 21px;
          top: 24px;
          cursor: pointer;
          .icloud-dialog__close {
            color: #fff;
            font-size: 18px;
            font-weight: bolder;
          }
        }
      }
      .icloud-dialog__body {
        width: 100%;
        padding: 30px 30px 39px 30px;
        background-color: #fff;
        overflow-y: auto;
        .el-form {
          @extend %el-form;
        }
      }
      .icloud-dialog__footer {
        width: 100%;
        height: 97px;
        background-color: #fff;
        border-top: 1px solid #D5D5D5;
        .icloud-dialog-footer {
          display: flex;
          justify-content: flex-end;
          .wx-button {
            margin-top: 31px;
            margin-right: 19px;
            &:last-of-type {
              margin-right: 47px;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .icloud-dialog__wrapper {
    .el-input {}
  }
</style>
