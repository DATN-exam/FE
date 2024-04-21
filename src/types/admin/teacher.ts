import { TSortOrder } from '../table'

export type TTeacher = {
  id: number | null
  last_name: string | null
  first_name: string | null
  dob: string | Date | null
  email: string | null
  status: string | null
}

export type TeacherSearchParams = {
  id: number | null
  name: string | null
  email: string | null
  status: string | null
} & TSortOrder

export type TeacherSearchFormProps = {
  dataSearch?: TeacherSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
}

export type UpdateTeacherStatusPayloads = {
  reason: string
}
