import { TSortOrder } from '../table'

export type TSetQuestion = {
  id: number | null
  teacher_id: number | null
  title: string | null
  status: string | null
  description: string | null
  note: string | null
  quantity_question: number | null
}

export type SetQuestionSearchParams = {
  title: string | null
  status: string | null
  page?: number | null
} & TSortOrder

export type SetQuestionSearchFormProps = {
  dataSearch?: SetQuestionSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
  className?: string | null
}
