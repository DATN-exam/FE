import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import { ExamHistoryType, QuestionType } from '@/config/define'
import QuestionMutiple from '@/pages/Site/Classroom/QuestionMutiple'
import QuestionEssay from '@/pages/Site/Classroom/QuestionEssay'
import examService from '@/services/teacher/examService'

function ShowResult() {
  const { setSidebarActive } = useSidebarActive()
  const { handleResponseError } = useHandleError()
  const { classroomId, idExam, idHistory } = useParams()
  const { showLoading, hideLoading } = useLoading()
  const [examDetail, setExamDetail] = useState<any>()

  const fetchExamHistoryDetail = () => {
    showLoading()
    examService
      .examHistortyDetail(classroomId, idExam, idHistory)
      .then(data => {
        console.log(data)
        setExamDetail(data)
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
      <div className="col-span-3 p-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">
              Xem kết quả cuộc thi {examDetail?.exam?.name}{' '}
              {examDetail?.type === ExamHistoryType.Experiment && '(Thi thử)'}
            </h1>
            <h1 className="mt-1 text-2xl font-medium">
              Học sinh: {examDetail?.student?.first_name} {examDetail?.student?.last_name}
              {examDetail?.type === ExamHistoryType.Experiment && '(Thi thử)'}
            </h1>
            <h1 className="mt-2 text-2xl font-medium">Tổng điểm {examDetail?.total_score}</h1>
            <h1 className="mt-3 text-xl font-medium">
              Thời gian làm bài {examDetail?.exam?.working_time}
            </h1>
            <h2 className="mt-3 text-lg font-medium">
              Bộ câu hỏi {examDetail?.exam?.set_question?.name}
            </h2>
          </div>
        </div>
        {examDetail?.exam_answers.map((answer: any, index: number) => {
          if (answer.question.type === QuestionType.Multiple) {
            return (
              <div className="mt-5" key={answer.id}>
                <QuestionMutiple disabled={true} examAnswer={answer} index={index + 1} />
              </div>
            )
          }
          return (
            <div className="mt-5" key={answer.id}>
              <QuestionEssay disabled={true} examAnswer={answer} index={index + 1} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ShowResult
