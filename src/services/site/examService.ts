import apiClient from './index'

const examService = {
  path: '/classrooms',
  async list(idClassroom: any) {
    const { data } = await apiClient.get(`${this.path}/${idClassroom}/exams`)
    return data
  },
  async getCurrent(idClassroom: any, id: any) {
    const { data } = await apiClient.get(`${this.path}/${idClassroom}/exams/${id}/get-current`)
    return data
  },
  async getCurrentExperiment(idClassroom: any, id: any) {
    const { data } = await apiClient.get(
      `${this.path}/${idClassroom}/exams/${id}/get-current-experiment`,
    )
    return data
  },
  async start(idClassroom: any, id: any) {
    const { data } = await apiClient.post(`${this.path}/${idClassroom}/exams/${id}/start`)
    return data
  },
  async startExperiment(idClassroom: any, id: any) {
    const { data } = await apiClient.post(
      `${this.path}/${idClassroom}/exams/${id}/start-experiment`,
    )
    return data
  },
  async examHistortyDetail(idClassroom: any, id: any, idHistory: any) {
    const { data } = await apiClient.get(
      `${this.path}/${idClassroom}/exams/${id}/history/${idHistory}`,
    )
    return data
  },
  async show(idClassroom: any, id: any) {
    const { data } = await apiClient.get(`${this.path}/${idClassroom}/exams/${id}`)
    return data
  },
  async changeAnswer(examsId: any, examAnswerId: any, payloads: any) {
    const { data } = await apiClient.post(
      `exams/${examsId}/change-answer/${examAnswerId}`,
      payloads,
    )
    return data
  },

  async submit(examHistoryId: any) {
    const { data } = await apiClient.post(`exams/${examHistoryId}/submit`)
    return data
  },
}

export default examService
