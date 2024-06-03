import { useEffect, useState } from 'react'
import { Button, Table } from '@/components/ui'
import { DEFAULT_PAGINATION_OBJECT, SORT_TYPE } from '@/config/define'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import { ClassroomSearchParams } from '@/types/teacher'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import { Drawer } from 'antd'
import CreateForm from './CreateForm'
import examService from '@/services/teacher/examService'
import { TExam } from '@/types/teacher/exam'

const defaultValueDataSearch: ClassroomSearchParams = {
  name: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function ClassroomExam() {
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [exams, setExams] = useState<TExam[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)
  const [openFormAdd, setOpenFormAdd] = useState(false)

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Tên',
      field: 'name',
      sortable: true,
    },
    {
      headerName: 'Thời gian làm bài',
      field: 'working_time',
      sortable: true,
    },
    {
      headerName: 'Ngày bắt đầu',
      field: 'start_date',
    },
    {
      headerName: 'Ngày kết thúc',
      field: 'end_date',
    },
    {
      headerName: 'Câu hỏi dễ',
      field: 'number_question_easy',
    },
    {
      headerName: 'Câu hỏi trung bình',
      field: 'number_question_medium',
    },
    {
      headerName: 'Câu hỏi khó',
      field: 'number_question_hard',
    },
  ]

  const fetchExams = () => {
    showLoading()
    examService
      .getList(id)
      .then(({ data, meta }) => {
        setExams(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchExams = useDebouncedCallback(fetchExams)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    debouncedFetchExams({ page: selected })
  }

  const handleCreateExam = () => {
    setOpenFormAdd(true)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.CLASSROOM.INDEX)
    debouncedFetchExams()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Danh sách cuộc thi</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleCreateExam}>Tạo cuộc thi</Button>
        </div>
        <Table
          columns={columns}
          rows={exams}
          pagination={pagination}
          defaultSortColumn={defaultValueDataSearch.sort_column}
          defaultSortType={defaultValueDataSearch.sort_type}
          handleChangePage={selected => handleChangePage(selected)}
        />
      </div>
      <Drawer
        title="Tạo cuộc thi"
        width={720}
        onClose={() => setOpenFormAdd(false)}
        open={openFormAdd}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CreateForm
          showLoading={showLoading}
          hideLoading={hideLoading}
          debouncedFetchExams={debouncedFetchExams}
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setOpenFormAdd={setOpenFormAdd}
        />
      </Drawer>
    </div>
  )
}

export default ClassroomExam
