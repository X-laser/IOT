import Layout from '@/layout'

export default {
  path: '/audit-logs',
  index: 9,
  component: Layout,
  children: [
    {
      path: '',
      meta: { title: '审计日志', icon: 'icon-audit-logs', breadcrumb: [{ title: '审计日志', path: '/audit-logs' }] },
      component: () => import('@/views/audit-logs')
    }
  ]
}
