import { useEffect, useState } from 'react'
import { Alert, Badge, Button, Table, Toast } from '@/components/ui'
import { ClassroomStudentStatus, DEFAULT_PAGINATION_OBJECT, SORT_TYPE } from '@/config/define'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import { ClassroomSearchParams } from '@/types/teacher'
import classroomService from '@/services/teacher/classroomService'
import SearchForm from './SearchForm'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import { Tooltip } from 'react-tooltip'
import { CLASSROOM_STUDENT_LIST_OPTIONS } from '@/config/define'
import { getValueFromObjectByKey } from '@/utils/helper'
import classroomStudentService from '@/services/teacher/classroomStudentService'
import { TStudent } from '@/types/teacher/student'

const defaultValueDataSearch: ClassroomSearchParams = {
  name: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function ClassroomStudent() {
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [students, setStudents] = useState<TStudent[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Họ và tên lót',
      field: 'first_name',
      sortable: true,
    },
    {
      headerName: 'Tên',
      field: 'last_name',
      sortable: true,
    },
    {
      headerName: 'Ngày sinh',
      field: 'dob',
      sortable: true,
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      valueGetter: row => (
        <>
          <button id={`not-${row.id}`} className="text-2xl">
            <i className="fa-light fa-circle-ellipsis"></i>
          </button>
          <Tooltip anchorSelect={`#not-${row.id}`} place="top-end">
            <p className="max-w-28">{row.description}</p>
          </Tooltip>
        </>
      ),
    },
    {
      headerName: 'Trạng thái',
      field: 'classroom_status',
      sortable: true,
      valueGetter: row => {
        const status = getValueFromObjectByKey(
          CLASSROOM_STUDENT_LIST_OPTIONS,
          'value',
          row.classroom_status,
        )
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'classroom_status',
      valueGetter: row =>
        row.classroom_status === ClassroomStudentStatus.Active ? (
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleBlockStudent(row)}>
            <i className="fa-solid fa-lock-keyhole"></i>
          </Button>
        ) : (
          <Button onClick={() => handleActiveStudent(row)}>
            <i className="fa-solid fa-lock-keyhole-open"></i>
          </Button>
        ),
    },
  ]

  const fetchClassroomStudents = (params?: any) => {
    showLoading()
    classroomService
      .students(id, params)
      .then(({ data, meta }) => {
        setStudents(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchClassroomStudents = useDebouncedCallback(fetchClassroomStudents)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    console.log(selected)
    setDataSearch({ ...dataSearch, page: selected })
    debouncedFetchClassroomStudents({ page: selected })
  }

  const search = () => {
    debouncedFetchClassroomStudents({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchClassroomStudents()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchClassroomStudents(dataTemp)
  }

  const handleBlockStudent = async (student: TStudent) => {
    const check = await Alert.confirm(
      `Bạn có muốn cấm học sinh ${student.last_name} không?`,
      'Có',
      'Không',
    )
    if (check) {
      showLoading()
      classroomStudentService
        .block(id, student.id)
        .then(() => {
          Toast.success('Vô hiệu hóa khóa thành công')
          debouncedFetchClassroomStudents(dataSearch)
        })
        .catch(err => {
          handleResponseError(err)
        })
        .finally(() => {
          hideLoading()
        })
    }
  }

  const handleActiveStudent = async (student: TStudent) => {
    const check = await Alert.confirm(
      `Bạn có muốn ân xá học sinh ${student.last_name} không?`,
      'Có',
      'Không',
    )
    if (check) {
      showLoading()
      classroomStudentService
        .active(id, student.id)
        .then(() => {
          Toast.success('Vô hiệu hóa khóa thành công')
          debouncedFetchClassroomStudents(dataSearch)
        })
        .catch(err => {
          handleResponseError(err)
        })
        .finally(() => {
          hideLoading()
        })
    }
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.CLASSROOM.INDEX)
    debouncedFetchClassroomStudents()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Danh sách học sinh</h1>
      <div className="space-y-6 rounded bg-card p-5 shadow">
        <SearchForm
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          onReset={resetDataSearch}
          onSearch={search}
        />
        <Table
          columns={columns}
          rows={students}
          pagination={pagination}
          defaultSortColumn={defaultValueDataSearch.sort_column}
          defaultSortType={defaultValueDataSearch.sort_type}
          onSort={sort}
          handleChangePage={selected => handleChangePage(selected)}
        />
      </div>
    </div>
  )
}

export default ClassroomStudent
