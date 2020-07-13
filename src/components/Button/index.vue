<template>
  <button type="button"
    :class="[
      'wx-button',
      `wx-button-${type}`
    ]"
    @click="$event => $emit('click', $event)">
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'WxButton',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
  .wx-button {
    border-radius: 6px;
    border-color: transparent;
    cursor: pointer;
    span {
      display: inline-block;
      line-height: 22px;
      padding: 8px 32px 8px 34px;
      font-size: 16px;
      border-color: transparent;
    }
    &.wx-button-default {
      background-color: #E6E6E6;
      span {
        color: #000;
      }
    }
    &.wx-button-primary {
      background-color: #4880FF;
      span {
        color: #fff;
      }
    }
    &.wx-button-warning {
      border-radius: 19px;
      background-color: #FFCC4F;
      span {
        color: #000;
        font-weight: bolder;
        padding: 6px 31px 5px 32px;
      }
    }
  }
</style>
