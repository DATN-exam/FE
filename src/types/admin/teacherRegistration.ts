import { TSortOrder } from '../table'

export type TTeacherRegistration = {
  id: number | null
  user_id: number | null
  status: string | null
  description: string | null
  employee_cofirm_id: number | null
  reason: string | null
}

export type TeacherRegistrationSearchParams = {
  name: string | null
  status: string | null
} & TSortOrder

export type TeacheRegistrationrSearchFormProps = {
  dataSearch?: TeacherRegistrationSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
}

export type TeacherRegistrationUpdateStatusProps = {
  registration: TTeacherRegistration
  currentPage: number
  fetchTeacherRegitration: (...args: any) => void
}
