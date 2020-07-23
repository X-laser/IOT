/**
 * 客户
*/
import { request } from '@/utils/request'

export default {
  getToken: id => request({ url: `/api/user/${id}/token` }),
  getUserInfo: id => request({ url: `/api/user/${id}` }),
  getCustomersList: params => request({ url: '/api/customers', params }),
  getCustomersInfo: id => request({ url: `/api/customer/${id}` }),
  getCustomersUserList: (params, id) => request({ url: `/api/customer/${id}/users`, params }),
  getCustomerAssetList: (params, id) => request({ url: `/api/customer/${id}/assets`, params }),
  getCustomerDeviceList: (params, id) => request({ url: `/api/customer/${id}/devices`, params }),
  getCustomerDashboardList: (params, id) => request({ url: `/api/customer/${id}/dashboards`, params }),
  getTenantInfos: id => request({ url: `/api/tenant/${id}` }),
  getUserActivationLink: id => request({ url: `/api/user/${id}/activationLink` }),
  updateCustomer: params => request({ url: '/api/customer', method: 'post', params }),
  postUserSendActivationMail: (params, sendActivationMail) => request({ url: `/api/user?sendActivationMail=${sendActivationMail}`, method: 'post', params }),
  postSendActivationMail: email => request({ url: `/api/user/sendActivationMail?email=${email}`, method: 'post' }),
  postUserCredentialsEnabled: (id, userCredentialsEnabled) => request({ url: `/api/user/${id}/userCredentialsEnabled?userCredentialsEnabled=${userCredentialsEnabled}`, method: 'post' }),
  postCustomerAsset: (userId, assetId) => request({ url: `/api/customer/${userId}/asset/${assetId}`, method: 'post' }),
  deleteCustomer: id => request({ url: `/api/customer/${id}`, method: 'delete' }),
  deleteUser: id => request({ url: `/api/user/${id}`, method: 'delete' }),
  deleteCustomerAsset: id => request({ url: `/api/customer/asset/${id}`, method: 'delete' })
}
