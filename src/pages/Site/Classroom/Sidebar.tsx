import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import classroomService from '@/services/site/classroomService'
import examService from '@/services/site/examService'
import { TClassroom } from '@/types/site'
import { TExam } from '@/types/site/exam'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Sidebar() {
  const { classroomId } = useParams()

  const { showLoading, hideLoading } = useLoading()
  const [showExamCurrent, setShowExamCurrent] = useState(true)
  const [showExam, setShowExam] = useState(false)
  const [classroom, setClassroom] = useState<TClassroom>()
  const [exams, setExams] = useState<TExam[]>([])
  const { handleResponseError } = useHandleError()

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

  return (
    <div className="border-r-2 px-3">
      <Link to={ROUTES_SITE.HOME}>
        <div className="hover:text-blue-500">
          <i className="fa-regular fa-angle-left"></i>
          <span className="ml-3">Tất cả các lớp</span>
        </div>
      </Link>
      <div className="mt-3">
        <img
          className="w-16 h-16 rounded"
          src="https://hoangviettravel.vn/wp-content/uploads/2023/12/dai-dien-11.jpg"
          alt="Default avatar"
        />
      </div>
      <div className="mt-3 border-b-4">
        <h1 className="font-medium text-xl">{classroom?.name}</h1>
      </div>
      <div>
        <button
          className="cursor-pointer mt-3"
          onClick={() => setShowExamCurrent(!showExamCurrent)}
        >
          {showExamCurrent ? (
            <i className="fa-solid fa-caret-right"></i>
          ) : (
            <i className="fa-sharp fa-solid fa-caret-down"></i>
          )}
          <span className="ml-3">Cuộc thi đang diễn ra</span>
        </button>
        {showExamCurrent && (
          <div>
            {exams.map(exam => (
              <div key={exam.id} className="mt-1">
                <Link
                  to={ROUTES_SITE.CLASROOM.EXAM.replace(':classroomId', classroomId ?? '').replace(
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

      <div>
        <button className="cursor-pointer mt-3" onClick={() => setShowExam(!showExam)}>
          {showExam ? (
            <i className="fa-solid fa-caret-right"></i>
          ) : (
            <i className="fa-sharp fa-solid fa-caret-down"></i>
          )}
          <span className="ml-3">Cuộc thi đã diễn ra </span>
        </button>
        {showExam && (
          <div>
            <div className="mt-1">
              <Link to="#">Cuộc thi 1</Link>
            </div>
            <div className="mt-1">
              <Link to="#">Cuộc thi 1</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
