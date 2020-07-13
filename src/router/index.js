import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const modules = require.context('./modules', false, /\.js$/)
export const routerList = modules.keys().map(key => modules(key).default).sort((a, b) => a.index - b.index)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  ...routerList
]

const router = new VueRouter({
  routes
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start()
  next()
})
// 当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router
