import apiClient from './index'
import { SetQuestionSearchParams } from '@/types/teacher/setQuestion'

const setQuestionService = {
  path: '/teachers/set-quetions',
  async getList(params: SetQuestionSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async getListReady() {
    const { data } = await apiClient.get(`${this.path}/set-question-ready`)
    return data
  },
  async create(params: any) {
    const { data } = await apiClient.post(this.path, params)
    return data
  },
  async show(id: any) {
    const { data } = await apiClient.get(`${this.path}/${id}`)
    return data
  },
  async update(id: any, payloads: any) {
    const { data } = await apiClient.patch(`${this.path}/${id}`, payloads)
    return data
  },
}

export default setQuestionService
