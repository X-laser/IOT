import Layout from '@/layout'
import MainContainer from '@/layout/MainContainer'

export default {
  path: '/customers',
  index: 3,
  component: Layout,
  children: [
    {
      path: '',
      meta: { title: '客户', icon: 'icon-customers' },
      component: MainContainer,
      children: [
        {
          path: '',
          meta: {
            breadcrumb: [{ title: '客户', path: '/customers' }]
          },
          component: () => import('@/views/customers/index')
        },
        {
          path: ':customerId',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '', path: '/customers/:customerId' }
            ]
          },
          component: () => import('@/views/customers/index/details'),
          props: true
        },
        {
          path: ':customerId/users',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户账号', path: '/customers/:customerId/users' }
            ]
          },
          component: () => import('@/views/customers/users'),
          props: true
        },
        {
          path: ':customerId/users/:userId',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户账号', path: '/customers/:customerId/users' },
              { title: '', path: '/customers/:customerId/users/:userId' }
            ]
          },
          component: () => import('@/views/customers/users/details'),
          props: true
        },
        {
          path: ':customerId/assets',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户资产', path: '/customers/:customerId/assets' }
            ]
          },
          component: () => import('@/views/customers/assets'),
          props: true
        },
        {
          path: ':customerId/assets/:assetId',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户资产', path: '/customers/:customerId/assets' },
              { title: '', path: '/customers/:customerId/assets/:assetId' }
            ]
          },
          component: () => import('@/views/customers/assets/details'),
          props: true
        },
        {
          path: ':customerId/devices',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户设备', path: '/customers/:customerId/devices' }
            ]
          },
          component: () => import('@/views/customers/devices'),
          props: true
        },
        {
          path: ':customerId/devices/:deviceId',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户设备', path: '/customers/:customerId/devices' },
              { title: '', path: '/customers/:customerId/devices/:deviceId' }
            ]
          },
          component: () => import('@/views/customers/devices/details'),
          props: true
        },
        {
          path: ':customerId/dashboards',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户应用', path: '/customers/:customerId/dashboards' }
            ]
          },
          component: () => import('@/views/customers/dashboards'),
          props: true
        },
        {
          path: ':customerId/dashboards/:dashboardId',
          meta: {
            breadcrumb: [
              { title: '客户', path: '/customers' },
              { title: '客户应用', path: '/customers/:customerId/dashboards' },
              { title: '', path: '/customers/:customerId/dashboards/:dashboardId' }
            ]
          },
          component: () => import('@/views/customers/dashboards/details'),
          props: true
        }
      ]
    }
  ]
}
