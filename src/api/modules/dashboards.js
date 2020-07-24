/**
 * 仪表板库
 */

import { request } from '@/utils/request'

export default {
  getDashboardsList: params => request({ url: '/api/tenant/dashboards', params }),
  getDashboardInfos: id => request({ url: `/api/dashboard/${id}` }),
  postDashboard: params => request({ url: '/api/dashboard', method: 'post', params })
}
