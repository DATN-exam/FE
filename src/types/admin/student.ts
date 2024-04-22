import { TSortOrder } from '../table'

export type TStudent = {
  id: number | null
  last_name: string | null
  first_name: string | null
  dob: string | Date | null
  email: string | null
  status: string | null
}

export type StudentSearchParams = {
  id: number | null
  name: string | null
  email: string | null
  status: string | null
} & TSortOrder

export type StudentSearchFormProps = {
  dataSearch?: StudentSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
}

export type StudentUpdateStatusProps = {
  student: TStudent
  currentPage: number
  fetchStudents: (...args: any) => void
}

export type StudentUpdateStatusPayloads = {
  reason: string
}
