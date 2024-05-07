import { QuestionSearchParams } from '@/types/teacher/question'
import apiClient from './index'

const questionService = {
  path: '/teachers/set-quetions',
  async getList(idSetQuestion: any, params: QuestionSearchParams) {
    const { data } = await apiClient.get(`${this.path}/${idSetQuestion}/questions`, { params })
    return data
  },
  async update(setQuestionId: any, id: any, payloads: any) {
    const { data } = await apiClient.put(`${this.path}/${setQuestionId}/questions/${id}`, payloads)
    return data
  },
}

export default questionService
