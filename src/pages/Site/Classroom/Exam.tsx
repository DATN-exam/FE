import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import { useLoading } from '@/contexts/loading'
import examService from '@/services/site/examService'
import useHandleError from '@/hooks/useHandleError'
import { TExam } from '@/types/site/exam'
import { Button } from '@/components/ui'

function Exam() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { classroomId, id } = useParams()
  const { handleResponseError } = useHandleError()
  const [exam, setExam] = useState<TExam>()

  const fetchExam = () => {
    showLoading()
    examService
      .show(classroomId, id)
      .then(data => {
        setExam(data)
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
    console.log(classroomId)
    setSidebarActive(ROUTES_SITE.HOME)
    fetchExam()
  }, [])

  return (
    <section className="grid grid-cols-4 p-5 h-full">
      <Sidebar />
      <div className="p-5 col-span-3">
        <h1 className="font-medium text-2xl">{exam?.name}</h1>
        <p className="text-gray-500">Ngày bắt đầu: {exam?.start_date}</p>
        <p className="text-gray-500">Đến hạn: {exam?.end_date}</p>
        <h1 className="mt-3 font-medium text-xl">Thời gian {exam?.working_time}</h1>
        <div className="mt-3 flex gap-5">
          <Button>Thi thử</Button>
          <Button>Làm bài</Button>
        </div>
      </div>
    </section>
  )
}

export default Exam
