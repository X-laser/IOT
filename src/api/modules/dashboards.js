/**
 * 仪表板库
 */

import { request } from '@/utils/request'

export default {
  getDashboardsList: params => request({ url: '/api/tenant/dashboards', params })
}
