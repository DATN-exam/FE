import { TSortOrder } from '../table'

export type TExam = {
  id: number | null
  name: string | null
  start_date: string | null
  is_show_result: boolean
  end_date: string | null
  number_question_hard: number | null
  number_question_medium: number | null
  number_question_easy: number | null
}

export type QuestionSearchParams = {
  question: string | null
  status: string | null
  type: string | null
  is_testing: boolean | null
  page?: number | null
} & TSortOrder

export type QuestionSearchFormProps = {
  dataSearch?: QuestionSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
  className?: string | null
}
