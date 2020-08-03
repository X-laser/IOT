/**
 * 部件库
 */

import { request } from '@/utils/request'

export default {
  getWidgetsBundlesList: params => request({ url: '/api/widgetsBundles', params }),
  getWidgetsBundleInfos: id => request({ url: `/api/widgetsBundle/${id}` }),
  getWidgetTypes: params => request({ url: '/api/widgetTypes', params }),
  postWidgetsBundle: params => request({ url: '/api/widgetsBundle', method: 'post', params }),
  deleteWidgetsBundle: id => request({ url: `/api/widgetsBundle/${id}`, method: 'delete' })
}
