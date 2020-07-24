/**
 * 设备
 */

import { request } from '@/utils/request'

export default {
  getDeviceInfo: params => request({ url: '/api/tenant/deviceInfos', params }),
  getDeviceTypes: _ => request({ url: '/api/device/types' }),
  getDeviceCredentials: deviceId => request({ url: `/api/device/${deviceId}/credentials` }),
  getItemDeviceInfo: deviceId => request({ url: `/api/device/info/${deviceId}` }),
  postDeviceCredentials: params => request({ url: '/api/device/credentials', method: 'post', params }),
  postDevice: params => request({ url: '/api/device', method: 'post', params })
}
