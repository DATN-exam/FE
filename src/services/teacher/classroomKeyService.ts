import { ClassroomKeyPayload } from '@/types/teacher/classroomKey'
import apiClient from './index'

const classroomKeyService = {
  path: '/teachers/classrooms',
  async create(id: any, payloads: ClassroomKeyPayload) {
    const { data } = await apiClient.post(`${this.path}/${id}/keys`, payloads)
    return data
  },
}

export default classroomKeyService
