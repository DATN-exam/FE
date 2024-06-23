import { Input } from '@/components/ui'
import useHandleError from '@/hooks/useHandleError'
import examService from '@/services/site/examService'
import { useEffect, useRef, useState } from 'react'

function QuestionEssay(props: any) {
  const { examAnswer, index, disabled, examHistoryId } = props
  const { handleResponseError } = useHandleError()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [value, setValue] = useState('')

  const fetchChangeAnswer = (answer: any) => {
    examService
      .changeAnswer(examHistoryId, examAnswer.id, { answer_text: answer })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {})
  }

  const handleChangeAnswer = (event: any) => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)
    setValue(event.target.value)
    timeoutRef.current = setTimeout(() => {
      fetchChangeAnswer(event.target.value)
    }, 2000)
  }

  const handleBlur = () => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)
    fetchChangeAnswer(value)
  }

  useEffect(() => {
    setValue(examAnswer.answer_text ?? '')
  }, [])
  return (
    <div>
      <div className="mb-3 flex gap-3">
        <h3 className="text-xl font-semibold">Câu hỏi {index}. </h3>
        <div
          className="editor-content overflow-hidden"
          dangerouslySetInnerHTML={{ __html: examAnswer?.question?.question }}
        />
      </div>
      <Input
        disabled={disabled}
        className="border-black"
        onChange={handleChangeAnswer}
        value={value}
        onBlur={handleBlur}
      />
    </div>
  )
}

export default QuestionEssay
