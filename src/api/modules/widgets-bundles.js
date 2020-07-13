/**
 * 部件库
 */

import { request } from '@/utils/request'

export default {
  getWidgetsBundlesList: params => request({ url: '/api/widgetsBundles', params })
}
