import useHandleError from '@/hooks/useHandleError'
import examService from '@/services/site/examService'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function QuestionMutiple(props: any) {
  const [value, setValue] = useState()
  const { examAnswer, index, disabled } = props
  const { handleResponseError } = useHandleError()
  const { id } = useParams()

  const fetchChangeAnswer = (idAnswer: any) => {
    examService
      .changeAnswer(id, examAnswer.id, { answer_id: idAnswer })
      .then(data => {
        console.log(data)
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
      <div className="flex gap-3 items-center">
        <h3 className="text-lg font-semibold">Câu hỏi {index}. </h3>
        <div
          className="editor-content overflow-hidden"
          dangerouslySetInnerHTML={{ __html: examAnswer?.question?.question }}
        />
      </div>
      <Radio.Group onChange={onChange} value={value}>
        {examAnswer.question.answers.map((answer: any) => (
          <div className="mt-4" key={answer.id}>
            <Radio value={answer.id} disabled={disabled}>{answer.answer}</Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  )
}

export default QuestionMutiple
