import { useEffect, useState } from 'react'
import { DEFAULT_PAGINATION_OBJECT, SORT_TYPE, TEACHER_STATUS_LIST_OPTIONS } from '@/config/define'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { StudentSearchParams, TStudent } from '@/types/admin'
import { getValueFromObjectByKey } from '@/utils/helper'
import studentService from '@/services/admin/studentService'
import { setPaginationData } from '@/utils/pagination'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { ROUTES_ADMIN } from '@/config/routes'
import { Badge, Table } from '@/components/ui'
import SearchForm from './SearchForm'
import UpdateStatus from './UpdateStatus'

const defaultValueDataSearch: StudentSearchParams = {
  id: null,
  name: '',
  email: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function Student() {
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
      field: 'last_name',
    },
    {
      headerName: 'Tên',
      field: 'first_name',
      sortable: true,
    },
    {
      headerName: 'Ngày sinh',
      field: 'dob',
      sortable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        const status = getValueFromObjectByKey(TEACHER_STATUS_LIST_OPTIONS, 'value', row.status)
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
      valueGetter: row => {
        return (
          <UpdateStatus
            student={row}
            fetchStudents={debouncedFetchStudents}
            currentPage={pagination.currentPage ?? 1}
          />
        )
      },
    },
  ]

  const fetchStudents = (params?: any) => {
    showLoading()
    studentService
      .getList(params)
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
  const debouncedFetchStudents = useDebouncedCallback(fetchStudents)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    fetchStudents({ page: selected })
  }

  const search = () => {
    debouncedFetchStudents({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchStudents()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchStudents(dataTemp)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_ADMIN.STUDENT)
    debouncedFetchStudents()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-foreground">Danh sách học sinh</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
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

export default Student
