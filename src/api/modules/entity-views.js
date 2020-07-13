/**
 * 实体视图
 */

import { request } from '@/utils/request'

export default {
  getEntityViewList: params => request({ url: '/api/tenant/entityViewInfos', params }),
  getEntityViewTypes: _ => request({ url: '/api/entityView/types' })
}
