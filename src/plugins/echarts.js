import Vue from 'vue'
// 引入ECharts主模块
const echarts = require('echarts/lib/echarts')

// 按需引入各个组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')

// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
require('echarts/lib/component/graphic')

Vue.prototype.$echarts = echarts
