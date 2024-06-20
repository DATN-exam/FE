import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, CountDownClock } from '@/components/ui'
import { useLoading } from '@/contexts/loading'
import QuestionMutiple from './QuestionMutiple'
import QuestionEssay from './QuestionEssay'
import examService from '@/services/site/examService'
import useHandleError from '@/hooks/useHandleError'
import { QuestionType } from '@/config/define'

function DoExam() {
  const { setSidebarActive } = useSidebarActive()
  const { state } = useLocation()
  const { handleResponseError } = useHandleError()
  const { classroomId, id } = useParams()
  const { exam, examHistory } = state
  const { showLoading, hideLoading } = useLoading()
  const [time, setTime] = useState(60)
  const [examDetail, setExamDetail] = useState<any>()
  const navigate = useNavigate()
  const onTimeOut = () => {
    fetchSubmit()
  }
  const fetchExamHistoryDetail = () => {
    showLoading()
    examService
      .examHistortyDetail(classroomId, id, examHistory.id)
      .then(data => {
        setExamDetail(data)
        if (data.remaining_time === 0) {
          fetchSubmit()
        }
        console.log(data)
        setTime(data.remaining_time)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchSubmit = () => {
    showLoading()
    examService
      .submit(examHistory.id)
      .then(() => {
        Alert.alert('Nộp bài thành công', 'Bạn đã nộp bài thành công', 'success')
      })
      .then(() => {
        navigate(
          ROUTES_SITE.CLASROOM.EXAM.replace(':classroomId', classroomId ?? '').replace(
            ':id',
            id ?? '',
          ),
        )
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.HOME)
    fetchExamHistoryDetail()
  }, [])

  return (
    <section className="grid grid-cols-4 p-5 h-full">
      <Sidebar />
      <div className="p-5 col-span-3">
        <div className="flex justify-between">
          <div>
            <h1 className="font-medium text-2xl">Làm bài cuộc thi {exam?.name}</h1>
            <h1 className="mt-3 font-medium text-xl">Thời gian làm bài {exam?.working_time}</h1>
            <h2 className="mt-3 font-medium text-lg">
              Bộ câu hỏi {examDetail?.exam?.set_question?.name}
            </h2>
          </div>
          {examHistory.is_submit == false && (
            <div>
              <CountDownClock onComplete={onTimeOut} time={time} />
            </div>
          )}
        </div>
        {examDetail?.exam_answers.map((answer: any, index: number) => {
          if (answer.question.type === QuestionType.Multiple) {
            return (
              <div className="mt-5" key={answer.id}>
                <QuestionMutiple
                  examHistoryId={examHistory.id}
                  disabled={examHistory.is_submit}
                  examAnswer={answer}
                  index={index + 1}
                />
              </div>
            )
          }
          return (
            <div className="mt-5" key={answer.id}>
              <QuestionEssay
                examHistoryId={examHistory.id}
                disabled={examHistory.is_submit}
                examAnswer={answer}
                index={index + 1}
              />
            </div>
          )
        })}
        {examHistory.is_submit == false && (
          <div className="flex justify-end">
            <Button onClick={fetchSubmit} className="mt-3">
              Nộp bài
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default DoExam
