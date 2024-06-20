import { Button } from '@/components/ui'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import examService from '@/services/teacher/examService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Ranking = (props: any) => {
  const { exam } = props
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [students, setStudents] = useState<any[]>([])
  const { id } = useParams()
  const fetchRanking = () => {
    showLoading()
    examService
      .getTop(id, exam.id)
      .then(data => {
        console.log(data)
        setStudents(data)
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
  }, [])
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Bảng xếp hạng cuộc thi: {exam.name}</h1>
        <Button>
          <i className="fa-sharp fa-solid fa-file-export"></i>
          <span>CSV</span>
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
  )
}

export default Ranking
