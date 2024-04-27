import { useEffect, useState } from 'react'
import { Table, Badge } from '@/components/ui'
import { DEFAULT_PAGINATION_OBJECT, SORT_TYPE, TEACHER_STATUS_LIST_OPTIONS } from '@/config/define'
import { ROUTES_ADMIN } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import teacherService from '@/services/admin/teacherService'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { TTeacher, TeacherSearchParams } from '@/types/admin'
import { setPaginationData } from '@/utils/pagination'
import SearchForm from './SearchForm'
import { getValueFromObjectByKey } from '@/utils/helper'
import UpdateStatus from './UpdateStatus'

const defaultValueDataSearch: TeacherSearchParams = {
  id: null,
  name: '',
  email: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function Teacher() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [teachers, setTeachers] = useState<TTeacher[]>([])
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
            teacher={row}
            fetchTeachers={debouncedFetchTeachers}
            currentPage={pagination.currentPage ?? 1}
          />
        )
      },
    },
  ]

  const fetchTeachers = (params?: any) => {
    showLoading()
    teacherService
      .getList(params)
      .then(({ data, meta }) => {
        setTeachers(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchTeachers = useDebouncedCallback(fetchTeachers)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    fetchTeachers({ page: selected })
  }

  const search = () => {
    debouncedFetchTeachers({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchTeachers()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchTeachers(dataTemp)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_ADMIN.TEACHER)
    debouncedFetchTeachers()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-foreground">Danh sách giáo viên</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <SearchForm
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          onReset={resetDataSearch}
          onSearch={search}
        />
        <Table
          columns={columns}
          rows={teachers}
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

export default Teacher
