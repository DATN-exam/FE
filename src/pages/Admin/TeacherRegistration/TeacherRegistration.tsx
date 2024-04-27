import { useEffect, useState } from 'react'
import { Table, Alert, Toast, Button, Badge } from '@/components/ui'
import {
  DEFAULT_PAGINATION_OBJECT,
  SORT_TYPE,
  TEACHER_REGISTRATION_STATUS_LIST_OPTIONS,
  TeacherRegistrationStatus,
} from '@/config/define'
import { ROUTES_ADMIN } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import { getValueFromObjectByKey } from '@/utils/helper'
import teacherRegistrationService from '@/services/admin/teacherRegistrationService'
import {
  TTeacherRegistration,
  TeacherRegistrationSearchParams,
} from '@/types/admin/teacherRegistration'
import SearchForm from './SearchForm'

const defaultValueDataSearch: TeacherRegistrationSearchParams = {
  name: '',
  status: '',
  sort_column: 'created_at',
  sort_type: SORT_TYPE.DESC,
}

function TeacherRegistration() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)
  const [registrations, setRegistrations] = useState<TTeacherRegistration[]>([])

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'USER ID',
      field: 'user_id',
    },
    {
      headerName: 'Họ và tên lót',
      field: 'user_last_name',
    },
    {
      headerName: 'Tên',
      field: 'user_first_name',
    },
    {
      headerName: 'Lý do đăng kí',
      field: 'description',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        const status = getValueFromObjectByKey(
          TEACHER_REGISTRATION_STATUS_LIST_OPTIONS,
          'value',
          row.status,
        )
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
      valueGetter: row => {
        return (
          row.status == TeacherRegistrationStatus.Wait && (
            <div className="flex gap-3">
              <Button className="bg-red-500" onClick={() => handleDeny(row)}>
                <i className="fa-solid fa-ban"></i>
              </Button>
              <Button onClick={() => handleAccept(row)}>
                <i className="fa-duotone fa-check"></i>
              </Button>
            </div>
          )
        )
      },
    },
  ]

  const fetchRegistration = (params?: any) => {
    showLoading()
    teacherRegistrationService
      .getList(params)
      .then(({ data, meta }) => {
        setRegistrations(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchTeacherRegitration = useDebouncedCallback(fetchRegistration)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    fetchRegistration({ page: selected })
  }

  const search = () => {
    debouncedFetchTeacherRegitration({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchTeacherRegitration()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchTeacherRegitration(dataTemp)
  }

  const handleDeny = async (registration: TTeacherRegistration) => {
    const check = await Alert.confirm('Xác nhận từ chối')
    if (check && registration.id) {
      teacherRegistrationService
        .deny(registration.id)
        .then(() => {
          Toast.success('Thành công')
          fetchRegistration(dataSearch)
        })
        .catch(err => {
          handleResponseError(err)
        })
        .finally(() => {
          hideLoading()
        })
    }
  }

  const handleAccept = async (registration: TTeacherRegistration) => {
    const check = await Alert.confirm('Xác nhận duyệt')
    if (check && registration.id) {
      teacherRegistrationService
        .accept(registration.id)
        .then(() => {
          Toast.success('Thành công')
          fetchRegistration(dataSearch)
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
    setSidebarActive(ROUTES_ADMIN.TEACER_REGISTRATION)
    debouncedFetchTeacherRegitration()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-foreground">Danh sách đơn đăng ký</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <SearchForm
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          onReset={resetDataSearch}
          onSearch={search}
        />
        <Table
          columns={columns}
          rows={registrations}
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

export default TeacherRegistration
