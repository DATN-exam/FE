import { Alert, Button, Select, TextEditor, Toast } from '@/components/ui'
import useHandleError from '@/hooks/useHandleError'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'
import { Radio } from 'antd'
import { useEffect, useState } from 'react'
import {
  QUESTION_LEVEL_LIST_OPTIONS,
  QUESTION_STATUS_LIST_OPTIONS,
  QUESTION_TYPE_LIST_OPTIONS,
  QuestionLevel,
  QuestionStatus,
  QuestionType,
} from '@/config/define'
import { TAnswer } from '@/types/teacher/answer'
import questionService from '@/services/teacher/questionService'
import { useParams } from 'react-router-dom'
import AnswerMultiple from './AnswerMultiple'
import AnswerEssay from './AnswerEssay'

const question = {
  id: null,
  question: '',
  level: QuestionLevel.Easy,
  type: QuestionType.Essay,
  status: QuestionStatus.Active,
  score: null,
  is_testing: false,
  answers: [],
}
const AddForm = (props: any) => {
  const { showLoading, hideLoading, fetchQuestions, dataSearch } = props
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    watch,
  } = useForm({
    defaultValues: question,
  })
  const { handleResponseError } = useHandleError()
  const { id } = useParams()
  const [isTesting, setIsTesting] = useState(question.is_testing)
  const [answersMultipleAdd, setAnswersMultipleAdd] = useState<TAnswer[]>([])
  const [answersEssayAdd, setAnswersEssayAdd] = useState<TAnswer[]>([])
  const [idCorrect, setIdCorrect] = useState()
  const [questionType, setQuestionType] = useState<any>()
  const [questionContent, setQuestionContent] = useState<any>()

  const updateQuestion: SubmitHandler<any> = data => {
    clearErrors()
    let newAnswersAdd = []
    if (questionType === QuestionType.Multiple) {
      newAnswersAdd = answersMultipleAdd.map((item: any) => {
        if (item.id === idCorrect) {
          item.is_correct = true
        } else {
          item.is_correct = false
        }
        return item
      })
    } else {
      newAnswersAdd = answersEssayAdd
    }
    const minLengthAnswer = questionType === QuestionType.Multiple ? 2 : 1
    if (newAnswersAdd.length < minLengthAnswer) {
      return Alert.alert(
        `Cần có ít nhất ${minLengthAnswer}`,
        `Cần ít nhất ${minLengthAnswer} cho câu hỏi`,
        'warning',
      )
    }
    const dataSubmit = {
      question: questionContent,
      is_testing: isTesting,
      status: data.status,
      answers: newAnswersAdd,
      type: data.type,
      level: data.level,
    }
    showLoading()
    questionService
      .add(id, dataSubmit)
      .then(() => {
        Toast.success('Thêm câu hỏi thành công')
        fetchQuestions({ ...dataSearch })
      })
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        } else {
          handleResponseError(err)
        }
      })
      .finally(() => {
        hideLoading()
      })
  }
  const {
    question: questionError,
    status: statusError,
    answers: answerError,
    type: typeError,
    level: levelError,
  } = errors

  useEffect(() => {
    setQuestionType(getValues('type'))
  }, [watch('type')])

  useEffect(() => {
    setQuestionContent(question.question)
    setQuestionType(question.type)
  }, [])

  return (
    <form
      onSubmit={handleSubmit(e => {
        updateQuestion(e)
      })}
    >
      <div className="flex justify-end">
        <Button type="submit" onClick={() => clearErrors()}>
          Thêm
        </Button>
      </div>
      <div className="flex gap-5 mt-4">
        <div>
          <label className="text-black">Trạng thái</label>
          <Select
            name="status"
            options={QUESTION_STATUS_LIST_OPTIONS}
            error={statusError}
            control={control}
          />
        </div>

        <div>
          <label className="text-black">Loại câu hỏi</label>
          <Select
            name="type"
            options={QUESTION_TYPE_LIST_OPTIONS}
            error={typeError}
            control={control}
          />
        </div>

        <div>
          <label className="text-black">Độ khó</label>
          <Select
            name="level"
            options={QUESTION_LEVEL_LIST_OPTIONS}
            error={levelError}
            control={control}
          />
        </div>

        <div>
          <label className="text-black">Loại</label>
          <Radio.Group value={isTesting ? 'a' : 'b'} buttonStyle="solid" className="mt-1 block">
            <Radio.Button value="b" onClick={() => setIsTesting(false)}>
              Thật
            </Radio.Button>
            <Radio.Button value="a" onClick={() => setIsTesting(true)}>
              Thử
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className="mt-4">
        {questionError && <p className="!text-red-600">{questionError.message?.toString()}</p>}
        <label className="text-black mt-1 block text-xl">Câu hỏi:</label>
        <TextEditor question={questionContent} setQuestion={setQuestionContent} />
      </div>

      <div className="mt-4 w-full">
        <label className="text-black mt-1 block text-xl">Câu trả lời:</label>
        {answerError ? <p className="!text-red-600">{answerError?.message?.toString()}</p> : ''}
        {questionType === QuestionType.Multiple ? (
          <AnswerMultiple
            setIdCorrect={setIdCorrect}
            idCorrect={idCorrect}
            answers={[]}
            setAnswers={[]}
            answersAdd={answersMultipleAdd}
            setAnswersAdd={setAnswersMultipleAdd}
            control={control}
            setAnswersDelete={[]}
            answersDelete={[]}
          />
        ) : (
          <AnswerEssay
            answers={[]}
            setAnswers={[]}
            answersAdd={answersEssayAdd}
            setAnswersAdd={setAnswersEssayAdd}
            control={control}
            setAnswersDelete={[]}
            answersDelete={[]}
          />
        )}
      </div>
    </form>
  )
}

export default AddForm
