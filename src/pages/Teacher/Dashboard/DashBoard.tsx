import { useEffect, useState } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import Char1 from './Char1'
import Char2 from './Char2'
import Char3 from './Char3'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import analysisService from '@/services/teacher/analysisService'

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [analysis, setAnalytics] = useState<any>()

  const fetchAnalysis = () => {
    showLoading()
    analysisService
      .analysis()
      .then(data => {
        setAnalytics(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.DASHBOARD)
    fetchAnalysis()
  }, [])

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl text-foreground">Thống kê</h1>
        <div className="flex justify-between gap-3 w-full">
          <div className="bg-gray-200 mt-3 p-3 flex-1 ">
            <div className="flex gap-3 items-center justify-start">
              <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
                <i className="fa-sharp fa-solid fa-person text-blue-500"></i>
              </div>
              <span>Số lượng lớp học</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.classrooms_count}</h1>
              <h1 className="ml-1 mt-3 text-green-500"></h1>
            </div>
          </div>
          <div className="bg-gray-200 mt-3 p-3 flex-1">
            <div className="flex gap-3 items-center justify-start">
              <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
                <i className="fa-sharp fa-light fa-hundred-points text-blue-500"></i>
              </div>
              <span>Số lượng lớp học đang hoạt động</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.classroom_active_count}</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 w-full">
          <div className="bg-gray-200 mt-3 p-3 flex-1 ">
            <div className="flex gap-3 items-center justify-start">
              <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
                <i className="fa-sharp fa-solid fa-person text-blue-500"></i>
              </div>
              <span>Số lượng bộ câu hỏi</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.set_question_count}</h1>
              <h1 className="ml-1 mt-3 text-green-500"></h1>
            </div>
          </div>
          <div className="bg-gray-200 mt-3 p-3 flex-1">
            <div className="flex gap-3 items-center justify-start">
              <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
                <i className="fa-sharp fa-light fa-hundred-points text-blue-500"></i>
              </div>
              <span>Số lượng bộ câu hỏi đang hoạt động</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="ml-1 mt-3 text-2xl font-bold">
                {analysis?.set_question_active_count}
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-card rounded p-5 shadow space-y-10">
          <Char1 />
          <Char3 />
          <Char2 />
        </div>
      </div>
    </>
  )
}

export default Dashboard
