import apiClient from './index'

const examService = {
  path: '/teachers/classrooms',
  async create(id: any, payloads: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/exams`, payloads)
    return data
  },
  async getList(id: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/exams`)
    return data
  },
}

export default examService
