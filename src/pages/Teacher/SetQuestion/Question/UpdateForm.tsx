import { Alert, Button, Input, Select, Toast } from '@/components/ui'
import useHandleError from '@/hooks/useHandleError'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'
import { Radio, Space } from 'antd'
import { useEffect, useState } from 'react'
import { QUESTION_STATUS_LIST_OPTIONS } from '@/config/define'
import { TAnswer } from '@/types/teacher/answer'
import { getRandomInt } from '@/utils/helper'
import questionService from '@/services/teacher/questionService'
import { useParams } from 'react-router-dom'

const UpdateForm = (props: any) => {
  const { showLoading, hideLoading, question } = props
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: question,
  })
  const { handleResponseError } = useHandleError()
  const { id } = useParams()
  const [isTesting, setIsTesting] = useState(question.is_testing)
  const [answers, setAnswers] = useState(question.answers)
  const [answersAdd, setAnswersAdd] = useState<TAnswer[]>([])
  const [answersDelete, setAnswersDelete] = useState<number[]>([])
  const [idCorrect, setIdCorrect] = useState()
  const updateQuestion: SubmitHandler<any> = data => {
    const newAnswersAdd = answersAdd.map((item: any) => {
      if (item.id === idCorrect) {
        item.is_correct = true
      } else {
        item.is_correct = false
      }
      return item
    })
    const newAnswersUpdate = answers.map((item: any) => {
      if (item.id === idCorrect) {
        item.is_correct = true
      } else {
        item.is_correct = false
      }
      return item
    })
    const dataSubmit = {
      question: data.question,
      is_testing: isTesting,
      status: data.status,
      answers_delete: answersDelete,
      answers_add: newAnswersAdd,
      answers_update: newAnswersUpdate,
    }

    showLoading()
    clearErrors()
    questionService
      .update(id, question.id, dataSubmit)
      .then(data => {
        Toast.success('Cập nhật bộ câu hỏi thành công')
        console.log(data)
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
  const { question: questionError, status: statusError } = errors
  console.log(questionError)
  const handleChangeAnswer = (e: any, answer: any) => {
    const newAnwers = answers.map((item: any) => {
      if (item.id === answer.id) {
        item.answer = e.target.value
      }
      return item
    })
    setAnswers(newAnwers)
  }
  const handleDeleteAnswer = (answer: any) => {
    if (answer.id === idCorrect) {
      Alert.alert(
        'Không thể xóa đáp án đúng!',
        'Vui lòng đổi đáp áp đúng hoặc chọn đáp án khác!',
        'warning',
      )
      return
    }
    const newAnwers = answers.filter((item: any) => {
      return item.id !== answer.id
    })
    setAnswersDelete([...answersDelete, answer.id])
    setAnswers(newAnwers)
  }

  const handleChangeAddAnswer = (e: any, answer: any) => {
    const newAnwers = answersAdd?.map((item: any) => {
      if (item.id === answer.id) {
        item.answer = e.target.value
      }
      return item
    })
    setAnswersAdd(newAnwers)
  }
  const handleDeleteAddAnswer = (answer: any) => {
    if (answer.id === idCorrect) {
      Alert.alert(
        'Không thể xóa đáp án đúng!',
        'Vui lòng đổi đáp áp đúng hoặc chọn đáp án khác!',
        'warning',
      )
      return
    }
    const newAnwers = answersAdd?.filter((item: any) => {
      return item.id !== answer.id
    })
    setAnswersAdd(newAnwers)
  }

  const handleAddAnswer = () => {
    setAnswersAdd([
      ...answersAdd,
      {
        id: 'add-' + getRandomInt(100, 10000),
        answer: 'Câu trả lời',
        is_correct: false,
      },
    ])
  }
  useEffect(() => {
    setIdCorrect(
      question.answers.find((item: any) => {
        return item.is_correct
      }).id,
    )
  }, [])
  return (
    <form onSubmit={handleSubmit(updateQuestion)}>
      <div className="flex justify-end">
        <Button type="submit">Cập nhật</Button>
      </div>
      <div className="mt-4">
        <label className="text-black">Trạng thái</label>
        <Select
          name="status"
          options={QUESTION_STATUS_LIST_OPTIONS}
          error={statusError}
          control={control}
        />
      </div>
      <div className="mt-4">
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
      <div className="mt-4">
        <label className="text-black">Câu hỏi</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Câu hỏi"
          type="text"
          name="question"
          control={control}
          error={questionError}
        />
      </div>

      <div className="mt-4 w-full">
        <label className="text-black mt-1 block">Câu trả lời</label>

        <Radio.Group
          onChange={e => {
            setIdCorrect(e.target.value)
          }}
          value={idCorrect}
          className="w-full"
        >
          <Space direction="vertical" className="mt-1 block w-full">
            {answers.map((answer: any) => (
              <div className="flex mt-2 gap-2" key={answer.id}>
                <Radio value={answer.id} className="mt-3"></Radio>
                <Input
                  control={control}
                  type="text"
                  value={answer.answer}
                  onChange={e => handleChangeAnswer(e, answer)}
                  classNameLayout="block grow wrap"
                />
                <Button
                  type="button"
                  className="bg-red-400 hover:bg-red-500"
                  onClick={() => handleDeleteAnswer(answer)}
                >
                  <i className="fa-regular fa-trash-can-slash"></i>
                </Button>
              </div>
            ))}
            {answersAdd.map((answer: any) => (
              <div className="flex mt-2 gap-2" key={answer.id}>
                <Radio value={answer.id} className="mt-3"></Radio>
                <Input
                  control={control}
                  type="text"
                  value={answer.answer}
                  onChange={e => handleChangeAddAnswer(e, answer)}
                  classNameLayout="block grow wrap"
                />
                <Button
                  type="button"
                  className="bg-red-400 hover:bg-red-500"
                  onClick={() => handleDeleteAddAnswer(answer)}
                >
                  <i className="fa-regular fa-trash-can-slash"></i>
                </Button>
              </div>
            ))}
            <div className="w-full mt-2 flex">
              <Button onClick={handleAddAnswer} type="button">
                Thêm câu trả lời
              </Button>
            </div>
          </Space>
        </Radio.Group>
      </div>

      {/* <div className="mt-4">
        <Select
          label="Loại"
          name="is_testing"
          options={QUESTION_TESTING_LIST_OPTIONS}
          error={isTestingError}
        />
      </div> */}
    </form>
  )
}

export default UpdateForm
