import Layout from '@/layout'

export default {
  path: '/',
  index: 1,
  component: Layout,
  children: [
    {
      path: '',
      meta: { title: '首页', icon: 'icon-home', breadcrumb: [{ title: '首页', path: '/' }], isBreadcrumb: false },
      component: () => import('@/views/home')
    }
  ]
}
