import { useEffect, useState } from 'react'
import { Alert, Button, Modal, Table } from '@/components/ui'
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
import { Drawer, Modal as ModalAnt } from 'antd'
import CreateForm from './CreateForm'
import examService from '@/services/teacher/examService'
import { TExam } from '@/types/teacher/exam'
import UpdateForm from './UpdateForm'
import Ranking from './Ranking'
import Analysis from './Analysis'

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
  const [openFormUpdate, setOpenFormUpdate] = useState(false)
  const [examUpdate, setExamUpdate] = useState<TExam>()
  const [showModalRanking, setShowModalRanking] = useState(false)
  const [examShowRanking, setExamShowRanking] = useState<TExam>()
  const [examShowAnalysis, setExamShowAnalysis] = useState<TExam>()
  const [showModalAnalysis, setShowModalAnalysis] = useState(false)

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
      headerName: 'Hiển thị kết quả sau khi nộp bài',
      field: 'is_show_result',
      valueGetter: row => (row.is_show_result ? 'Có' : 'Không'),
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
      headerName: 'Hành động',
      field: 'end_date',
      valueGetter: row => (
        <div className="flex gap-3">
          <Button onClick={() => handleUpdate(row)}>
            <i className="fa-sharp fa-solid fa-pen-to-square"></i>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(row)}>
            <i className="fa-solid fa-trash-can-slash"></i>
          </Button>
        </div>
      ),
    },
    {
      headerName: 'Thống kê',
      field: 'end_date',
      valueGetter: row => (
        <div className="flex gap-3">
          <Button onClick={() => handleShowRanking(row)}>
            <i className="fa-sharp fa-solid fa-ranking-star"></i>
          </Button>
          <Button className="" onClick={() => handleShowAnalysis(row)}>
            <i className="fa-sharp fa-solid fa-display-chart-up"></i>
          </Button>
        </div>
      ),
    },
  ]

  const handleShowAnalysis = (exam: TExam) => {
    setExamShowAnalysis(exam)
    setShowModalAnalysis(true)
  }

  const handleShowRanking = (exam: TExam) => {
    setExamShowRanking(exam)
    setShowModalRanking(true)
  }

  const handleUpdate = (exam: TExam) => {
    setExamUpdate(exam)
    setOpenFormUpdate(true)
  }

  const handleDelete = async (exam: TExam) => {
    const confirm = await Alert.confirm(
      'Bạn có chắc chắn muốn xóa cuộc thi này không?',
      'Có',
      'Không',
      'error',
    )
    if (confirm) {
      fetchDeleteExams(exam)
    }
  }
  const fetchDeleteExams = (exam: TExam) => {
    showLoading()
    examService
      .delete(id, exam.id)
      .then(() => {
        Alert.alert('Thành công', 'Bạn đã xóa cuộc thi thành công', 'success')
        debouncedFetchExams(dataSearch)
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
      <div className="space-y-6 rounded bg-card p-5 shadow">
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

      <Drawer
        title="Cập nhật cuộc thi"
        width={720}
        onClose={() => setOpenFormUpdate(false)}
        destroyOnClose={true}
        open={openFormUpdate}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <UpdateForm
          showLoading={showLoading}
          hideLoading={hideLoading}
          debouncedFetchExams={() => debouncedFetchExams(dataSearch)}
          setOpenFormUpdate={setOpenFormUpdate}
          exam={examUpdate}
        />
      </Drawer>
      <Modal
        show={showModalRanking}
        close={() => {
          setShowModalRanking(false)
        }}
      >
        <Ranking exam={examShowRanking} />
      </Modal>
      <ModalAnt
        title="Thống kê cuộc thi"
        open={showModalAnalysis}
        onCancel={() => setShowModalAnalysis(false)}
        width={1000}
        destroyOnClose={true}
      >
        <Analysis exam={examShowAnalysis} />
      </ModalAnt>
    </div>
  )
}

export default ClassroomExam
