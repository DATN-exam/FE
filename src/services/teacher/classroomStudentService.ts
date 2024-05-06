import apiClient from './index'

const classroomStudentService = {
  path: '/teachers/classrooms',
  async block(id: any, idStudent: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/students/${idStudent}/block`)
    return data
  },
  async active(id: any, idStudent: any) {
    const { data } = await apiClient.post(`${this.path}/${id}/students/${idStudent}/active`)
    return data
  },
}

export default classroomStudentService
