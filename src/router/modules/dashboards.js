import Layout from '@/layout'
import MainContainer from '@/layout/MainContainer'

export default {
  path: '/dashboards',
  index: 8,
  component: Layout,
  auth: ['TENANT_ADMIN', 'CUSTOMER_USER'],
  children: [
    {
      path: '',
      meta: { title: '仪表板库', icon: 'icon-dashboards' },
      component: MainContainer,
      children: [
        {
          path: '',
          meta: { breadcrumb: [{ title: '仪表板库', path: '/dashboards' }] },
          component: () => import('@/views/dashboards')
        },
        {
          path: ':id',
          meta: {
            breadcrumb: [
              { title: '仪表板库', path: '/dashboards' },
              { title: '', path: '/dashboards/:id' }
            ]
          },
          component: () => import('@/views/dashboards/details'),
          props: true
        }
      ]
    }
  ]
}
