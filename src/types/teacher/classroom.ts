import { TSortOrder } from '../table'

export type TClassroom = {
  id: number | null
  name: string | null
  teacher_id: number | null
  status: string | null
  description: string | null
  count_student: number | null
}

export type ClassroomSearchParams = {
  name: string | null
  status: string | null
} & TSortOrder

export type ClassroomSearchFormProps = {
  dataSearch?: ClassroomSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
}

export type ClassroomUpdatePayloads = {
  name: string | null
  status: string | null
  description: string | null
}

export type ClassroomStudentSearchParams = {
  name: string | null
  status: string | null
}
