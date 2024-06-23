import { ExamStatus } from '@/config/define'
import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import classroomService from '@/services/site/classroomService'
import examService from '@/services/site/examService'
import { TClassroom } from '@/types/site'
import { TExam } from '@/types/site/exam'
import { MouseEventHandler, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import studentAuthBg from '@/assets/student-auth-bg.jpg'
import { cn } from '@/lib/utils'

type TListExam = {
  classroomId: string
  examId: string
  isShow: boolean
  title: string
  exams: TExam[]
  onClick: MouseEventHandler<HTMLButtonElement>
}

const ListExams = (props: TListExam) => {
  const { classroomId, examId, isShow, title, exams, onClick } = props

  return (
    <div>
      <button className="cursor-pointer space-x-3" onClick={onClick}>
        <i className={cn('fa-sharp fa-solid fa-caret-right transition', isShow && 'rotate-90')}></i>
        <span>{title}</span>
      </button>
      {isShow && (
        <div className="ml-5 mt-1 space-y-1">
          {exams.map(exam => (
            <div key={exam.id}>
              <Link
                className={cn(
                  'block w-full px-3 py-1 font-medium',
                  examId == exam.id ? 'bg-accent' : 'hover:bg-accent',
                )}
                to={ROUTES_SITE.CLASROOM.EXAM.replace(':classroomId', classroomId).replace(
                  ':id',
                  exam.id ?? '',
                )}
              >
                {exam.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {
  const { classroomId, id: examId } = useParams()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [showExamCurrent, setShowExamCurrent] = useState(false)
  const [showExamUpComing, setShowExamUpComing] = useState(false)
  const [showExamHappened, setShowExamHappened] = useState(false)
  const [classroom, setClassroom] = useState<TClassroom>()
  const [exams, setExams] = useState<TExam[]>([])

  const fetchClassroom = () => {
    showLoading()
    classroomService
      .show(classroomId)
      .then(data => {
        setClassroom(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchExams = () => {
    showLoading()
    examService
      .list(classroomId)
      .then(data => {
        setExams(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    fetchClassroom()
    fetchExams()
  }, [])

  useEffect(() => {
    if (!examId || !exams.length) {
      setShowExamCurrent(true)
    } else {
      const examStatus = exams.find(exam => exam.id == examId)?.status
      if (examStatus === ExamStatus.Happening) {
        setShowExamCurrent(true)
      } else if (examStatus === ExamStatus.Upcoming) {
        setShowExamUpComing(true)
      } else if (examStatus === ExamStatus.Happened) {
        setShowExamHappened(true)
      }
    }
  }, [examId, exams.length])

  return (
    <div className="hidden space-y-5 border-r p-5 md:block">
      <Link to={ROUTES_SITE.HOME} className="space-x-3 text-sm hover:text-primary">
        <i className="fa-regular fa-angle-left"></i>
        <span className="ml-3">Tất cả các lớp</span>
      </Link>
      <img
        className="aspect-square size-16 rounded object-cover"
        src={classroom?.avatar ?? studentAuthBg}
        alt="Default avatar"
      />
      <h1 className="text-xl font-bold">{classroom?.name}</h1>
      <div className="space-y-3">
        <div className="ml-3">
          <Link to="#">Trang chủ</Link>
        </div>
        <hr />
        <ListExams
          classroomId={classroomId ?? ''}
          examId={examId ?? ''}
          isShow={showExamCurrent}
          title="Cuộc thi đang diễn ra"
          exams={exams.filter(exam => exam.status === ExamStatus.Happening)}
          onClick={() => setShowExamCurrent(!showExamCurrent)}
        />
        <ListExams
          classroomId={classroomId ?? ''}
          examId={examId ?? ''}
          isShow={showExamUpComing}
          title="Cuộc thi sắp diễn ra"
          exams={exams.filter(exam => exam.status === ExamStatus.Upcoming)}
          onClick={() => setShowExamUpComing(!showExamUpComing)}
        />
        <ListExams
          classroomId={classroomId ?? ''}
          examId={examId ?? ''}
          isShow={showExamHappened}
          title="Cuộc thi đã kết thúc"
          exams={exams.filter(exam => exam.status === ExamStatus.Happened)}
          onClick={() => setShowExamHappened(!showExamHappened)}
        />
      </div>
    </div>
  )
}

export default Sidebar
