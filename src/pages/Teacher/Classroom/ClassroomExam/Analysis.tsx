import { Button } from '@/components/ui'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import examService from '@/services/teacher/examService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Analysis = (props: any) => {
  const { exam } = props
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [students, setStudents] = useState<any[]>([])
  const [analysis, setAnalysis] = useState<any>()
  const { id } = useParams()
  const fetchRanking = () => {
    showLoading()
    examService
      .getTop(id, exam.id)
      .then(data => {
        setStudents(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchAnalysis = () => {
    showLoading()
    examService
      .analysis(id, exam.id)
      .then(data => {
        setAnalysis(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleExport = () => {
    showLoading()
    examService
      .getTopExport(id, exam.id)
      .then(blob => {
        console.log(blob)
        const blobS = window.URL.createObjectURL(
          new Blob([blob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        )
        const link = document.createElement('a')
        link.href = blobS
        link.setAttribute('download', 'ranking.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    fetchRanking()
    fetchAnalysis()
  }, [])

  return (
    <div className="p-3 w-full">
      <h1 className="text-xl font-bold">Thống kê về cuộc thi {exam.name}</h1>
      <div className="flex justify-between gap-3 w-full">
        <div className="bg-gray-200 mt-3 p-3 flex-1 ">
          <div className="flex gap-3 items-center justify-start">
            <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
              <i className="fa-sharp fa-solid fa-person text-blue-500"></i>
            </div>
            <span>Số lượng học sinh tham gia</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.number_student_join}</h1>
            <h1 className="ml-1 mt-3 text-green-500">
              {((analysis?.number_student_join / analysis?.total_student) * 100).toFixed(2)}%
            </h1>
          </div>
        </div>
        <div className="bg-gray-200 mt-3 p-3 flex-1">
          <div className="flex gap-3 items-center justify-start">
            <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
              <i className="fa-sharp fa-light fa-hundred-points text-blue-500"></i>
            </div>
            <span>Điểm trung bình</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.average_score}</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3 w-full">
        <div className="bg-gray-200 mt-3 p-3 flex-1 ">
          <div className="flex gap-3 items-center justify-start">
            <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
              <i className="fa-sharp fa-solid fa-person text-blue-500"></i>
            </div>
            <span>Thời gian trung bình làm bài</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.average_time_taken}</h1>
            <h1 className="ml-1 mt-3 text-green-500"></h1>
          </div>
        </div>
        <div className="bg-gray-200 mt-3 p-3 flex-1">
          <div className="flex gap-3 items-center justify-start">
            <div className="bg-gray-200 rounded-full w-12 h-12 p-3 flex items-center justify-center">
              <i className="fa-sharp fa-light fa-hundred-points text-blue-500"></i>
            </div>
            <span>Điểm tối đa</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="ml-1 mt-3 text-2xl font-bold">{analysis?.max_score}</h1>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Bảng xếp hạng cuộc thi: {exam.name}</h1>
          <Button onClick={handleExport}>
            <i className="fa-sharp fa-solid fa-file-export"></i>
            <span>Excel</span>
          </Button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Top
              </th>
              <th scope="col" className="px-6 py-3">
                Học sinh
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian làm bài
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{`${student.student.first_name} ${student.student.last_name}`}</td>
                <td className="px-6 py-4">{student.total_score}</td>
                <td className="px-6 py-4">{student.time_taken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Analysis
