/**
 * 实体视图
 */

import { request } from '@/utils/request'

export default {
  getEntityViewList: params => request({ url: '/api/tenant/entityViewInfos', params }),
  getEntityViewInfo: id => request({ url: `/api/entityView/info/${id}` }),
  getEntityViewTypes: _ => request({ url: '/api/entityView/types' }),
  postCustomerEntityView: (customerId, entityViewId) => request({ url: `/api/customer/${customerId}/entityView/${entityViewId}`, method: 'post' }),
  postEntityView: params => request({ url: '/api/entityView', method: 'post', params }),
  postCustomerPublicEntityView: entityViewId => request({ url: `/api/customer/public/entityView/${entityViewId}`, method: 'post' }),
  deleteCustomerEntityView: entityViewId => request({ url: `/api/customer/entityView/${entityViewId}`, method: 'delete' }),
  deleteEntityView: entityViewId => request({ url: `/api/entityView/${entityViewId}`, method: 'delete' })
}
