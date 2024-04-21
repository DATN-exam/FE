import { UpdateTeacherStatusPayloads, TeacherSearchParams } from '@/types/admin'
import apiClient from './index'

const teacherService = {
  path: '/admin/teachers',
  async getList(params: TeacherSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async ban(id: number, payloads: UpdateTeacherStatusPayloads) {
    const { data } = await apiClient.post(`${this.path}/${id}/block`, payloads)
    return data
  },
  async unBan(id: number, payloads: UpdateTeacherStatusPayloads) {
    const { data } = await apiClient.post(`${this.path}/${id}/active`, payloads)
    return data
  },
}

export default teacherService
