import { useEffect, useState } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import analysisService from '@/services/teacher/analysisService'
import { HorizontalBarChart, InfoCard } from '@/components/ui/Chart'

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

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 rounded bg-card p-5 shadow md:grid-cols-2">
          <InfoCard
            iconClassName="fa-solid fa-people-roof"
            title="Số lượng lớp học"
            content={analysis?.classrooms_count}
          />
          <InfoCard
            iconClassName="fa-solid fa-people-roof"
            title="Số lượng lớp học đang hoạt động"
            content={analysis?.classroom_active_count}
          />
          <InfoCard
            iconClassName="fa-solid fa-seal-question"
            title="Số lượng bộ câu hỏi"
            content={analysis?.set_question_count}
          />
          <InfoCard
            iconClassName="fa-solid fa-seal-question"
            title="Số lượng bộ câu hỏi đang hoạt động"
            content={analysis?.set_question_active_count}
          />
          <HorizontalBarChart
            layoutClassName="col-span-1 md:col-span-2 2xl:col-span-1"
            title="Số lượng học sinh theo lớp học"
            dataLabel="Học sinh"
            labels={analysis?.classrooms?.map((room: any) => room.name)}
            dataset={analysis?.classrooms?.map((room: any) => room.students_count)}
          />
          <HorizontalBarChart
            layoutClassName="col-span-1 md:col-span-2 2xl:col-span-1"
            title="Số lượng câu hỏi theo bộ câu hỏi"
            dataLabel="Câu hỏi"
            chartBackgroundColor="rgb(255, 99, 132)"
            chartBorderColor="rgba(255, 99, 132, 0.5)"
            labels={analysis?.set_question?.map((room: any) => room.title)}
            dataset={analysis?.set_question?.map((room: any) => room.questions_count)}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
