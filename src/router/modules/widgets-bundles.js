import Layout from '@/layout'
import MainContainer from '@/layout/MainContainer'

export default {
  path: '/widgets-bundles',
  index: 7,
  component: Layout,
  auth: ['SYS_ADMIN', 'TENANT_ADMIN'],
  children: [
    {
      path: '',
      meta: { title: '部件库', icon: 'icon-widgets-bundles' },
      component: MainContainer,
      children: [
        {
          path: '',
          meta: { breadcrumb: [{ title: '部件库', path: '/widgets-bundles' }] },
          component: () => import('@/views/widgets-bundles')
        },
        {
          path: ':id/widget-types',
          meta: {
            breadcrumb: [
              { title: '部件库', path: '/widgets-bundles' },
              { title: '', path: '/widgets-bundles/:id' }
            ]
          },
          component: () => import('@/views/widgets-bundles/widget-types')
        }
      ]
    }
  ]
}
