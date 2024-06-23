import apiClient from './index'

const analysisService = {
  path: '/teachers/analysis',
  async analysis() {
    const { data } = await apiClient.get(this.path)
    return data
  },
}

export default analysisService
