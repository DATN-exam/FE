import { TeacherSearchParams } from '@/types/admin'
import apiClient from './index'

const teacherRegistrationService = {
  path: '/admin/teachers/registration',
  async getList(params: TeacherSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async deny(id: number) {
    const { data } = await apiClient.post(`${this.path}/${id}/deny`)
    return data
  },
  async accept(id: number) {
    const { data } = await apiClient.post(`${this.path}/${id}/confirm`)
    return data
  },
}

export default teacherRegistrationService
