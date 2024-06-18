import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useLoading } from '@/contexts/loading'
import examService from '@/services/site/examService'
import useHandleError from '@/hooks/useHandleError'
import { TExam } from '@/types/site/exam'
import { Button } from '@/components/ui'
import { ExamStatus } from '@/config/define'

function Exam() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { classroomId, id } = useParams()
  const { handleResponseError } = useHandleError()
  const [exam, setExam] = useState<TExam>()
  const [examCurrent, setExamCurrent] = useState<any>()
  const navigate = useNavigate()

  const fetchExam = () => {
    showLoading()
    examService
      .show(classroomId, id)
      .then(data => {
        setExam(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchExamCurrent = () => {
    showLoading()
    examService
      .getCurrent(classroomId, id)
      .then(data => {
        setExamCurrent(Object.keys(data).length > 0 ? data : null)
        console.log(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchStartExam = async () => {
    showLoading()
    await examService
      .start(classroomId, id)
      .then(data => {
        setExamCurrent(data)
      })
      .then(() => {
        navigate(
          ROUTES_SITE.CLASROOM.DO_EXAM.replace(':classroomId', classroomId ?? '').replace(
            ':id',
            id ?? '',
          ),
          { state: { exam: exam, examHistory: examCurrent } },
        )
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleDoExam = () => {
    //call api start exam
    fetchStartExam()
  }
  const handleDoingExam = () => {
    navigate(
      ROUTES_SITE.CLASROOM.DO_EXAM.replace(':classroomId', classroomId ?? '').replace(
        ':id',
        id ?? '',
      ),
      { state: { exam: exam, examHistory: examCurrent } },
    )
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.HOME)
    fetchExam()
    fetchExamCurrent()
  }, [id])

  return (
    <section className="grid grid-cols-4 p-5 h-full">
      <Sidebar />
      <div className="p-5 col-span-3">
        <h1 className="font-medium text-2xl">Cuộc thi {exam?.name}</h1>
        <p className="text-gray-500">Ngày bắt đầu: {exam?.start_date}</p>
        <p className="text-gray-500">Đến hạn: {exam?.end_date}</p>
        <h1 className="mt-3 font-medium text-xl">Thời gian làm bài {exam?.working_time}</h1>
        <h1 className="mt-3 font-medium text-xl">Điểm của bạn: {examCurrent?.total_score}</h1>
        {exam?.status === ExamStatus.Happening && (
          <div className="mt-3 flex gap-5">
            <Button>Thi thử</Button>
            {examCurrent ? (
              examCurrent.is_submit ? (
                <Button onClick={handleDoingExam}>Xem kết quả</Button>
              ) : (
                <Button onClick={handleDoingExam}>Tiếp tục làm bài</Button>
              )
            ) : (
              <Button onClick={handleDoExam}>Làm bài</Button>
            )}
          </div>
        )}

        {exam?.status == ExamStatus.Upcoming && <div>Cuộc thi này chưa bắt đầu</div>}

        {exam?.status == ExamStatus.Happened && <Button>Xem kết quả</Button>}
      </div>
    </section>
  )
}

export default Exam
