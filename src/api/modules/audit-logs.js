/**
 * 审计日志
*/
import { request } from '@/utils/request'

export default {
  getAuditLogsList: params => request({ url: '/api/audit/logs', params }),
  getEntityViewLogs: (params, id) => request({ url: `/api/audit/logs/entity/ENTITY_VIEW/${id}`, params }),
  getAuditLogsEntityDashboardList: (params, id) => request({ url: `/api/audit/logs/entity/DASHBOARD/${id}`, params })
}
