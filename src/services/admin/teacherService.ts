import { TeacherSearchParams } from '@/types/admin'
import apiClient from './index'

const teacherService = {
  path: '/admin/teachers',
  async getList(params: TeacherSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
}

export default teacherService
