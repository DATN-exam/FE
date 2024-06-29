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
import { Modal as ModalAnt } from 'antd'
import Analysis from './Analysis'

function Exam() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { classroomId, id } = useParams()
  const { handleResponseError } = useHandleError()
  const [exam, setExam] = useState<TExam>()
  const [examCurrent, setExamCurrent] = useState<any>()
  const [examCurrentExperiment, setExamCurrentExperiment] = useState<any>()
  const [showModalRanking, setShowModalRanking] = useState(false)
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
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchExamCurrentExpriment = () => {
    showLoading()
    examService
      .getCurrentExperiment(classroomId, id)
      .then(data => {
        setExamCurrentExperiment(Object.keys(data).length > 0 ? data : null)
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
        return data
      })
      .then(data => {
        navigate(
          ROUTES_SITE.CLASROOM.DO_EXAM.replace(':classroomId', classroomId ?? '').replace(
            ':id',
            id ?? '',
          ),
          { state: { exam: exam, examHistory: data } },
        )
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchStartExamExpriment = async () => {
    showLoading()
    await examService
      .startExperiment(classroomId, id)
      .then(data => {
        return data
      })
      .then(data => {
        navigate(
          ROUTES_SITE.CLASROOM.DO_EXAM.replace(':classroomId', classroomId ?? '').replace(
            ':id',
            id ?? '',
          ),
          { state: { exam: exam, examHistory: data } },
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

  const handleShowResult = () => {
    navigate(
      ROUTES_SITE.CLASROOM.SHOW_RESULT.replace(':classroomId', classroomId ?? '').replace(
        ':id',
        id ?? '',
      ),
      { state: { exam: exam, examHistory: examCurrent } },
    )
  }
  const handleShowResultExperiment = () => {
    navigate(
      ROUTES_SITE.CLASROOM.SHOW_RESULT.replace(':classroomId', classroomId ?? '').replace(
        ':id',
        id ?? '',
      ),
      { state: { exam: exam, examHistory: examCurrentExperiment } },
    )
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

  const handleDoingExamExpriment = () => {
    navigate(
      ROUTES_SITE.CLASROOM.DO_EXAM.replace(':classroomId', classroomId ?? '').replace(
        ':id',
        id ?? '',
      ),
      { state: { exam: exam, examHistory: examCurrentExperiment } },
    )
  }

  const handleDoExamExperiment = () => {
    fetchStartExamExpriment()
  }

  const handleRanking = () => {
    setShowModalRanking(true)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.HOME)
    fetchExam()
    fetchExamCurrent()
    fetchExamCurrentExpriment()
  }, [id])

  return (
    <section className="grid h-full grid-cols-4">
      <Sidebar />
      <div className="col-span-3 p-5">
        <h1 className="text-2xl font-medium">Cuộc thi {exam?.name}</h1>
        <p className="text-gray-500">Ngày bắt đầu: {exam?.start_date}</p>
        <p className="text-gray-500">Đến hạn: {exam?.end_date}</p>
        <h1 className="mt-3 text-xl font-medium">Thời gian làm bài {exam?.working_time}</h1>
        {examCurrent?.show_result === false ? (
          <h1>Kết quả sẽ có sau khi cuộc thi kết thúc</h1>
        ) : (
          <>
            <h1 className="mt-3 text-xl font-medium">Điểm của bạn: {examCurrent?.total_score}</h1>
          </>
        )}
        <div className="mt-3 flex gap-5">
          {examCurrentExperiment && !examCurrentExperiment.is_submit ? (
            <Button onClick={handleDoingExamExpriment}>Tiếp tục thi thử</Button>
          ) : (
            <Button onClick={handleDoExamExperiment}>Thi thử</Button>
          )}
          {examCurrentExperiment && examCurrentExperiment.is_submit && (
            <Button onClick={handleShowResultExperiment}>Xem kết quả thi thử</Button>
          )}
        </div>
        <div className="mt-3 flex gap-5">
          {exam?.status === ExamStatus.Happening &&
            examCurrent &&
            examCurrent.is_submit === false && (
              <Button onClick={handleDoingExam}>Tiếp tục làm bài</Button>
            )}

          {exam?.status === ExamStatus.Happening && !examCurrent && (
            <Button onClick={handleDoExam}>Làm bài</Button>
          )}

          {examCurrent && examCurrent.show_result && (
            <>
              <Button onClick={handleShowResult} className="mr-3">
                Xem kết quả
              </Button>
              <Button onClick={handleRanking}>Xem bảng xếp hạng</Button>
            </>
          )}
        </div>

        {exam?.status == ExamStatus.Upcoming && <div>Cuộc thi này chưa bắt đầu</div>}
      </div>
      <ModalAnt
        title="Thống kê cuộc thi"
        open={showModalRanking}
        onCancel={() => setShowModalRanking(false)}
        width={1000}
        destroyOnClose={true}
      >
        <Analysis exam={exam} />
      </ModalAnt>
    </section>
  )
}

export default Exam
