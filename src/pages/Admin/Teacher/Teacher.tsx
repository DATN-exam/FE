import { useEffect, useState } from 'react'
import { Table } from '@/components/ui'
import { DEFAULT_PAGINATION_OBJECT, SORT_TYPE, TEACHER_STATUS_LIST } from '@/config/define'
import { ROUTES_ADMIN } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import teacherService from '@/services/admin/teacherService'
import { TSetPagination, TTableColumn } from '@/types'
import { TTeacher, TeacherSearchParams } from '@/types/admin'
import { setPaginationData } from '@/utils/pagination'
import SearchForm from './SearchForm'
import { getValueFromObjectByKey } from '@/utils/helper'

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
    },
    {
      headerName: 'Họ và tên lót',
      field: 'last_name',
    },
    {
      headerName: 'Tên',
      field: 'first_name',
    },
    {
      headerName: 'Ngày sinh',
      field: 'dob',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        return getValueFromObjectByKey(TEACHER_STATUS_LIST, 'value', row.status, 'name')
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
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

  useEffect(() => {
    setSidebarActive(ROUTES_ADMIN.TEACHER)
    debouncedFetchTeachers()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Danh sách giáo viên</h1>
      <div className="bg-white rounded p-5 shadow space-y-6">
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
          handleChangePage={selected => handleChangePage(selected)}
        />
      </div>
    </div>
  )
}

export default Teacher
