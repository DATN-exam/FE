import apiClient from './index'

const examService = {
  path: '/teachers/classrooms',
  async create(id: any, payloads: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/exams`, payloads)
    return data
  },
  async update(id: any, payloads: any, examId: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/exams/${examId}`, payloads)
    return data
  },
  async getList(id: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/exams`)
    return data
  },
  async delete(id: any, examId: any) {
    const { data } = await apiClient.delete(`${this.path}/${id}/exams/${examId}`)
    return data
  },
  async getTop(id: any, examId: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/exams/${examId}/get-top`)
    return data
  },
  async getTopExport(id: any, examId: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/exams/${examId}/get-top-export`, {
      responseType: 'blob',
    })
    return data
  },
  async analysis(id: any, examId: any) {
    const { data } = await apiClient.get(`${this.path}/${id}/exams/${examId}/analysis`)
    return data
  },
}

export default examService
