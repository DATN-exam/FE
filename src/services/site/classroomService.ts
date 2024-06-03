import apiClient from './index'

const classroomService = {
  path: '/classrooms',
  async getList(params: any) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
  async show(id: any) {
    const { data } = await apiClient.get(`${this.path}/${id}`)
    return data
  },
  async join(key: string) {
    const { data } = await apiClient.get(`${this.path}/join/${key}`)
    return data
  },
}

export default classroomService
