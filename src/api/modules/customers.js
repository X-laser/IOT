/**
 * 客户
*/
import { request } from '@/utils/request'

export default {
  getToken: id => request({ url: `/api/user/${id}/token` }),
  getUserInfo: id => request({ url: `/api/user/${id}` }),
  getCustomersList: params => request({ url: '/api/customers', params }),
  getCustomersUserList: (params, id) => request({ url: `/api/customer/${id}/users`, params }),
  getCustomerAssetList: (params, id) => request({ url: `/api/customer/${id}/assets`, params }),
  getCustomerDeviceList: (params, id) => request({ url: `/api/customer/${id}/devices`, params }),
  getCustomerDashboardList: (params, id) => request({ url: `/api/customer/${id}/dashboards`, params }),
  getTenantInfos: id => request({ url: `/api/tenant/${id}` }),
  updateCustomer: params => request({ url: '/api/customer', method: 'post', params }),
  updateUser: (params, sendActivationMail) => request({ url: `/api/user?sendActivationMail=${sendActivationMail}`, method: 'post', params }),
  deleteCustomer: id => request({ url: `/api/customer/${id}`, method: 'delete' }),
  deleteUser: id => request({ url: `/api/user/${id}`, method: 'delete' })
}
