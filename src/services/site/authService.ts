import { LoginPayloads, RegisterPayloads, VerifyPayload } from '@/types'
import apiClient from './index'

const authService = {
  path: '/auth',
  async login(payloads: LoginPayloads) {
    const { data } = await apiClient.post(`${this.path}/login`, payloads)
    return data
  },
  async logout() {
    const { data } = await apiClient.post(`${this.path}/logout`)
    return data
  },
  async getProfile() {
    const { data } = await apiClient.get(`${this.path}/profile`)
    return data
  },
  async register(payloads: RegisterPayloads) {
    const { data } = await apiClient.post(`${this.path}/register`, payloads)
    return data
  },
  async verify(payloads: VerifyPayload) {
    const { data } = await apiClient.post(`${this.path}/verify`, payloads)
    return data
  },
  async loginWithGoogle(payloads: any) {
    const { data } = await apiClient.post(`${this.path}/google/callback`, payloads)
    return data
  },
}

export default authService
