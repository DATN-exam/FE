import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useLocation, useParams } from 'react-router-dom'
import { useLoading } from '@/contexts/loading'
import QuestionMutiple from './QuestionMutiple'
import QuestionEssay from './QuestionEssay'
import examService from '@/services/site/examService'
import useHandleError from '@/hooks/useHandleError'
import { ExamHistoryType, QuestionType } from '@/config/define'

function ShowResult() {
  const { setSidebarActive } = useSidebarActive()
  const { state } = useLocation()
  const { handleResponseError } = useHandleError()
  const { classroomId, id } = useParams()
  const { exam, examHistory } = state
  const { showLoading, hideLoading } = useLoading()
  const [examDetail, setExamDetail] = useState<any>()

  const fetchExamHistoryDetail = () => {
    showLoading()
    examService
      .examHistortyDetail(classroomId, id, examHistory.id)
      .then(data => {
        setExamDetail(data)
        console.log(data)
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
    <section className="grid h-full grid-cols-4 p-5">
      <Sidebar />
      <div className="col-span-3 p-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">
              Xem kết quả cuộc thi {exam?.name}{' '}
              {examDetail.type === ExamHistoryType.Experiment && '(Thi thử)'}
            </h1>
            <h1 className="mt-2 text-2xl font-medium">Tổng điểm {examDetail?.total_score}</h1>
            <h1 className="mt-3 text-xl font-medium">Thời gian làm bài {exam?.working_time}</h1>
            <h2 className="mt-3 text-lg font-medium">
              Bộ câu hỏi {examDetail?.exam?.set_question?.name}
            </h2>
          </div>
        </div>
        {examDetail?.exam_answers.map((answer: any, index: number) => {
          if (answer.question.type === QuestionType.Multiple) {
            return (
              <div className="mt-5" key={answer.id}>
                <QuestionMutiple
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
                disabled={examHistory.is_submit}
                examAnswer={answer}
                index={index + 1}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ShowResult
