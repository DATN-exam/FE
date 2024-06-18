import { Alert, Button, Input } from '@/components/ui'
import { getRandomInt } from '@/utils/helper'
import { Space } from 'antd'
import { useEffect } from 'react'

const AnswerEssay = (props: any) => {
  const {
    answers,
    control,
    setAnswers,
    setAnswersDelete,
    answersDelete,
    answersAdd,
    setAnswersAdd,
  } = props
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
    if (answers.length + answersAdd.length <= 1) {
      Alert.alert('Có ít nhất 1 đáp án', 'Phải có ít nhất 1 đáp án', 'warning')
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
    if (answersAdd.length + answers.length <= 1) {
      Alert.alert('Có ít nhất 1 đáp án', 'Phải có ít nhất 1 đáp án', 'warning')
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
      },
    ])
  }

  useEffect(() => {
    console.log(answers)
  }, [])
  return (
    <>
      <Space direction="vertical" className="mt-1 block w-full grid grid-cols-2">
        {answers.map((answer: any) => (
          <div className="flex mt-2 gap-2" key={answer.id}>
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
            Thêm câu trả lời tự luận
          </Button>
        </div>
      </Space>
    </>
  )
}

export default AnswerEssay
