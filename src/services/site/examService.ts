import apiClient from './index'

const examService = {
  path: '/classrooms',
  async list(idClassroom: any) {
    const { data } = await apiClient.get(`${this.path}/${idClassroom}/exams`)
    return data
  },
  async show(idClassroom: any, id: any) {
    const { data } = await apiClient.get(`${this.path}/${idClassroom}/exams/${id}`)
    return data
  },
}

export default examService
