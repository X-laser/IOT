/**
 * 资产
 */

import { request } from '@/utils/request'

export default {
  getAssetInfos: params => request({ url: '/api/tenant/assetInfos', params }),
  getAssetTypes: _ => request({ url: '/api/asset/types' }),
  getItemAssetInfo: assetId => request({ url: `/api/asset/info/${assetId}` }),
  postAsset: params => request({ url: '/api/asset', method: 'post', params })
}
