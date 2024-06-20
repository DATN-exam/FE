import apiClient from './index'

const notificationService = {
  path: 'auth/notifications',
  async getAll() {
    const { data } = await apiClient.get(this.path)
    return data
  },
}

export default notificationService
