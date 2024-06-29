import {
  ClassroomCreatePayloads,
  ClassroomSearchParams,
  ClassroomStudentSearchParams,
  ClassroomUpdatePayloads,
} from '@/types/teacher'
import apiClient from './index'

const classroomService = {
  path: '/teachers/classrooms',
  async getList(params: ClassroomSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async show(id: any) {
    const { data } = await apiClient.get(`${this.path}/${id}`)
    return data
  },
  async update(id: any, payloads: ClassroomUpdatePayloads) {
    const { data } = await apiClient.patch(`${this.path}/${id}`, payloads)
    return data
  },
  async create(payloads: ClassroomCreatePayloads) {
    const { data } = await apiClient.post(`${this.path}`, payloads)
    return data
  },
  async students(id: any, params: ClassroomStudentSearchParams) {
    const { data } = await apiClient.get(`${this.path}/${id}/students`, { params })
    return data
  },
  async exportStudents(id: any, params: ClassroomStudentSearchParams) {
    const { data } = await apiClient.get(`${this.path}/${id}/students/export`, {
      params,
      responseType: 'blob',
    })
    return data
  },
  async keys(id: any, params: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/keys`, { params })
    return data
  },
  async keyBlock(id: any, keyId: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/keys/${keyId}/block`)
    return data
  },
  async keyActive(id: any, keyId: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/keys/${keyId}/active`)
    return data
  },
}

export default classroomService
