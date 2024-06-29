import { useEffect, useState } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import { InfoCard } from '@/components/ui/Chart'
import analysisService from '@/services/admin/analysisService'
import LineChart from '@/components/ui/Chart/LineChart'
import { Select } from '@/components/ui'
import { useForm } from 'react-hook-form'

const defaultValue = {
  yearUserMonthly: 2024,
  yearClassroomMonthly: 2024,
}

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [analysis, setAnalytics] = useState<any>()
  const [userMonthly, setUserMonthly] = useState<any>()
  const [classroomMonthly, setClassroomMonthly] = useState<any>()
  const { control, getValues, watch } = useForm({
    defaultValues: defaultValue,
  })

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

  const fetchUserMonthly = () => {
    showLoading()
    analysisService
      .userMonthly({ year: getValues('yearUserMonthly') })
      .then(data => {
        setUserMonthly(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchClassroomMonthly = () => {
    showLoading()
    analysisService
      .classroomMonthly({ year: getValues('yearClassroomMonthly') })
      .then(data => {
        setClassroomMonthly(data)
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
    fetchUserMonthly()
    fetchClassroomMonthly()
  }, [])
  useEffect(() => {
    fetchUserMonthly()
  }, [watch('yearUserMonthly')])

  useEffect(() => {
    fetchClassroomMonthly()
  }, [watch('yearClassroomMonthly')])

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl text-foreground">Thống kê</h1>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 rounded bg-card p-5 shadow md:grid-cols-2">
          <InfoCard
            iconClassName="fa-solid fa-people-roof"
            title="Số lượng người dùng"
            content={analysis?.total_users}
          />
          <InfoCard
            iconClassName="fa-solid fa-people-roof"
            title="Số lượng người dùng mới trong tháng này"
            content={analysis?.number_new_user}
          />
          <InfoCard
            iconClassName="fa-solid fa-people-roof"
            title="Số lượng người dùng là giáo viên"
            content={analysis?.total_teacher}
          />
          <InfoCard
            iconClassName="fa-solid fa-seal-question"
            title="Số lượng lớp học"
            content={analysis?.number_classroom}
          />
          <InfoCard
            iconClassName="fa-solid fa-seal-question"
            title="Số lượng cuộc thi"
            content={analysis?.number_exams}
          />
          <InfoCard
            iconClassName="fa-solid fa-seal-question"
            title="Số lượng bộ câu hỏi"
            content={analysis?.number_set_questions}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 rounded bg-card p-5 shadow md:grid-cols-2">
          <Select
            className="w-24"
            control={control}
            name="yearUserMonthly"
            options={[
              { value: 2021, name: '2021' },
              { value: 2022, name: '2022' },
              { value: 2023, name: '2023' },
              { value: 2024, name: '2024' },
            ]}
          />
          <LineChart
            layoutClassName="col-span-1 md:col-span-2 2xl:col-span-1"
            title={`Người dùng mới theo từng tháng của năm ${getValues('yearUserMonthly')}`}
            dataLabel="Số lượng người dùng"
            dataset={userMonthly?.map((item: any) => item.number_user)}
            labels={userMonthly?.map((item: any) => item.month)}
            chartBackgroundColor="rgba(75, 192, 192, 0.2)"
            chartBorderColor="rgb(75, 192, 192)"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 rounded bg-card p-5 shadow md:grid-cols-2">
          <Select
            className="w-24"
            control={control}
            name="yearClassroomMonthly"
            options={[
              { value: 2021, name: '2021' },
              { value: 2022, name: '2022' },
              { value: 2023, name: '2023' },
              { value: 2024, name: '2024' },
            ]}
          />
          <LineChart
            layoutClassName="col-span-1 md:col-span-2 2xl:col-span-1"
            title={`Lớp học mới theo từng tháng của năm ${getValues('yearClassroomMonthly')}`}
            dataLabel="Số lượng lớp học"
            dataset={classroomMonthly?.map((item: any) => item.number_classroom)}
            labels={classroomMonthly?.map((item: any) => item.month)}
            chartBackgroundColor="rgba(75, 192, 192, 0.2)"
            chartBorderColor="rgb(75, 192, 192)"
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
