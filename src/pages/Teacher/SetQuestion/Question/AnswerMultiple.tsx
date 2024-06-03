import { Alert, Button, Input } from '@/components/ui'
import { getRandomInt } from '@/utils/helper'
import { Radio, Space } from 'antd'

const AnswerMultiple = (props: any) => {
  const {
    setIdCorrect,
    idCorrect,
    answers,
    setAnswers,
    answersAdd,
    setAnswersAdd,
    control,
    setAnswersDelete,
    answersDelete,
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
    if (answersAdd.length + answers.length <= 2) {
      Alert.alert(
        'Có ít nhất 2 đáp án',
        'Phải có ít nhất 2 đáp án ở câu hỏi trắc nghiệm',
        'warning',
      )
      return
    }
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
    if (answersAdd.length + answers.length <= 2) {
      Alert.alert(
        'Có ít nhất 2 đáp án',
        'Phải có ít nhất 2 đáp án ở câu hỏi trắc nghiệm',
        'warning',
      )
      return
    }
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
    const newId = 'add-' + getRandomInt(100, 10000)
    setAnswersAdd([
      ...answersAdd,
      {
        id: newId,
        answer: 'Câu trả lời',
        is_correct: idCorrect ? false : true,
      },
    ])
    if (!idCorrect) {
      setIdCorrect(newId)
    }
  }

  return (
    <>
      <Radio.Group
        onChange={e => {
          setIdCorrect(e.target.value)
        }}
        value={idCorrect}
        className="w-full"
      >
        <Space direction="vertical" className="mt-1 block w-full grid grid-cols-2">
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
    </>
  )
}
export default AnswerMultiple
