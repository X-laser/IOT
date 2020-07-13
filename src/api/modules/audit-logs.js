/**
 * 审计日志
*/
import { request } from '@/utils/request'

export default {
  getAuditLogsList: params => request({ url: '/api/audit/logs', params })
}
