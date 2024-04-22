import { StudentSearchParams, StudentUpdateStatusPayloads } from '@/types/admin'
import apiClient from './index'

const studentService = {
  path: '/admin/students',
  async getList(params: StudentSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async ban(id: number, payloads: StudentUpdateStatusPayloads) {
    const { data } = await apiClient.post(`${this.path}/${id}/block`, payloads)
    return data
  },
  async unBan(id: number, payloads: StudentUpdateStatusPayloads) {
    const { data } = await apiClient.post(`${this.path}/${id}/active`, payloads)
    return data
  },
}

export default studentService
