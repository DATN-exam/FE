import apiClient from './index'

const analysisService = {
  path: '/admin/analysis',
  async analysis() {
    const { data } = await apiClient.get(this.path)
    return data
  },
  async userMonthly(params: any) {
    const { data } = await apiClient.get(`${this.path}/new-user-monthly`, { params })
    return data
  },
  async classroomMonthly(params: any) {
    const { data } = await apiClient.get(`${this.path}/new-classroom-monthly`, { params })
    return data
  },
}

export default analysisService
