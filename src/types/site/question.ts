import { TSortOrder } from '../table'
import { TAnswer } from './answer'

export type TQuestion = {
  id: number | null
  question: string | null
  level: string | null
  type: string | null
  status: string | null
  score: string | null
  is_testing: boolean | null
  answers: TAnswer[]
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
