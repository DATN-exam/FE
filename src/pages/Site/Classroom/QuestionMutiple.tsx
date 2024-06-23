import useHandleError from '@/hooks/useHandleError'
import examService from '@/services/site/examService'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { useEffect, useState } from 'react'

function QuestionMutiple(props: any) {
  const [value, setValue] = useState()
  const { examAnswer, index, disabled, examHistoryId } = props
  const { handleResponseError } = useHandleError()

  const fetchChangeAnswer = (idAnswer: any) => {
    examService
      .changeAnswer(examHistoryId, examAnswer.id, { answer_id: idAnswer })
      .then(() => {
        // console.log(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {})
  }
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    fetchChangeAnswer(e.target.value)
  }
  useEffect(() => {
    setValue(examAnswer.answer_id)
  }, [])

  return (
    <div>
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Câu hỏi {index}. </h3>
        <div
          className="editor-content overflow-hidden"
          dangerouslySetInnerHTML={{ __html: examAnswer?.question?.question }}
        />
        {disabled ? (
          examAnswer.is_correct ? (
            <i className="fa-sharp fa-solid fa-circle-check text-xl text-green-600"></i>
          ) : (
            <i className="fa-sharp fa-solid fa-circle-xmark text-xl text-red-600"></i>
          )
        ) : null}
      </div>
      <Radio.Group onChange={onChange} value={value}>
        {examAnswer.question.answers.map((answer: any) => (
          <div className="mt-4" key={answer.id}>
            <Radio value={answer.id} disabled={disabled}>
              <div className="flex items-center gap-3">
                {answer.answer}
                {disabled && answer.is_correct && (
                  <i className="fa-sharp fa-solid fa-circle-check text-green-600"></i>
                )}
              </div>
            </Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  )
}

export default QuestionMutiple
