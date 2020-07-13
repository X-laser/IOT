/**
 * 设备
 */

import { request } from '@/utils/request'

export default {
  getDeviceInfo: params => request({ url: '/api/tenant/deviceInfos', params }),
  getDeviceTypes: _ => request({ url: '/api/device/types' })
}
