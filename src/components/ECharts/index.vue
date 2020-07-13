<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    init () {
      const echarts = this.$echarts.init(this.$refs.chart)
      echarts.setOption(this.option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
