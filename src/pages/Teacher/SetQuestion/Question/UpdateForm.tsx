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
  QuestionType,
} from '@/config/define'
import { TAnswer } from '@/types/teacher/answer'
import questionService from '@/services/teacher/questionService'
import { useParams } from 'react-router-dom'
import AnswerMultiple from './AnswerMultiple'
import AnswerEssay from './AnswerEssay'

const UpdateForm = (props: any) => {
  const { showLoading, hideLoading, question, fetchQuestions, pagination } = props
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
  const [answersMultiple, setAnswersMultiple] = useState([])
  const [answersMultipleAdd, setAnswersMultipleAdd] = useState<TAnswer[]>([])
  const [answersEssay, setAnswersEssay] = useState([])
  const [answersEssayAdd, setAnswersEssayAdd] = useState<TAnswer[]>([])
  const [answersDelete, setAnswersDelete] = useState<number[]>([])
  const [idCorrect, setIdCorrect] = useState()
  const [questionType, setQuestionType] = useState()
  const [questionContent, setQuestionContent] = useState()

  const updateQuestion: SubmitHandler<any> = data => {
    clearErrors()
    let newAnswersAdd = []
    let newAnswersUpdate = []
    if (questionType === QuestionType.Multiple) {
      newAnswersAdd = answersMultipleAdd.map((item: any) => {
        if (item.id === idCorrect) {
          item.is_correct = true
        } else {
          item.is_correct = false
        }
        return item
      })
      newAnswersUpdate = answersMultiple.map((item: any) => {
        if (item.id === idCorrect) {
          item.is_correct = true
        } else {
          item.is_correct = false
        }
        return item
      })
    } else {
      newAnswersAdd = answersEssayAdd
      newAnswersUpdate = answersEssay
    }
    const minLengthAnswer = questionType === QuestionType.Multiple ? 2 : 1
    if (newAnswersAdd.length + newAnswersUpdate.length < minLengthAnswer) {
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
      answers_delete: answersDelete,
      answers_add: newAnswersAdd,
      answers_update: newAnswersUpdate,
      type: data.type,
      level: data.level,
    }
    showLoading()
    questionService
      .update(id, question.id, dataSubmit)
      .then(() => {
        Toast.success('Cập nhật bộ câu hỏi thành công')
        fetchQuestions({ page: pagination.currentPage })
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
    setIdCorrect(
      question.answers.find((item: any) => {
        return item.is_correct
      })?.id,
    )
    setQuestionType(question.type)
    if (question.type === QuestionType.Multiple) {
      setAnswersMultiple(question.answers)
    } else {
      setAnswersEssay(question.answers)
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit(e => {
        updateQuestion(e)
      })}
    >
      <div className="flex justify-end">
        <Button type="submit" onClick={() => clearErrors()}>
          Cập nhật
        </Button>
      </div>
      <div className="mt-4 flex gap-5">
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
        <label className="mt-1 block text-xl text-black">Câu hỏi:</label>
        <TextEditor question={questionContent} setQuestion={setQuestionContent} />
      </div>

      <div className="mt-4 w-full">
        <label className="mt-1 block text-xl text-black">Câu trả lời:</label>
        {answerError ? <p className="!text-red-600">{answerError?.message?.toString()}</p> : ''}
        {questionType === QuestionType.Multiple ? (
          <AnswerMultiple
            setIdCorrect={setIdCorrect}
            idCorrect={idCorrect}
            answers={answersMultiple}
            setAnswers={setAnswersMultiple}
            answersAdd={answersMultipleAdd}
            setAnswersAdd={setAnswersMultipleAdd}
            control={control}
            setAnswersDelete={setAnswersDelete}
            answersDelete={answersDelete}
          />
        ) : (
          <AnswerEssay
            answers={answersEssay}
            setAnswers={setAnswersEssay}
            answersAdd={answersEssayAdd}
            setAnswersAdd={setAnswersEssayAdd}
            control={control}
            setAnswersDelete={setAnswersDelete}
            answersDelete={answersDelete}
          />
        )}
      </div>
    </form>
  )
}

export default UpdateForm
