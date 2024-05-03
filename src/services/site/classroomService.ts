import apiClient from './index'

const classroomService = {
  path: '/classrooms',
  async getList(params: any) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
}

export default classroomService
