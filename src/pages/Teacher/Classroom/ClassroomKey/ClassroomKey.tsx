import { useEffect, useState } from 'react'
import { Alert, Badge, Button, Table, Toast } from '@/components/ui'
import {
  CLASSROOM_KEY_LIST_OPTIONS,
  ClassroomKeyStatus,
  DEFAULT_PAGINATION_OBJECT,
  SORT_TYPE,
} from '@/config/define'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import { ClassroomSearchParams } from '@/types/teacher'
import classroomService from '@/services/site/teacher/classroomService'
import SearchForm from '../SearchForm'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import { getValueFromObjectByKey } from '@/utils/helper'
import { TClassroomKey } from '@/types/teacher/classroomKey'

const defaultValueDataSearch: ClassroomSearchParams = {
  name: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function ClassroomKey() {
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [keys, setKeys] = useState<TClassroomKey[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)

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
      headerName: 'Mã',
      field: 'key',
    },
    {
      headerName: 'Số lượng',
      field: 'quantity',
      sortable: true,
    },
    {
      headerName: 'Còn lại',
      field: 'remaining',
      sortable: true,
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      sortable: true,
      valueGetter: row => {
        const status = getValueFromObjectByKey(CLASSROOM_KEY_LIST_OPTIONS, 'value', row.status)
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'status',
      valueGetter: row =>
        row.status === ClassroomKeyStatus.Active ? (
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleBlockKey(row)}>
            <i className="fa-solid fa-lock-keyhole"></i>
          </Button>
        ) : (
          <Button onClick={() => handleActiveKey(row)}>
            <i className="fa-solid fa-lock-keyhole-open"></i>
          </Button>
        ),
    },
  ]

  const fetchClassroomKeys = (params?: any) => {
    showLoading()
    classroomService
      .keys(id, params)
      .then(({ data, meta }) => {
        setKeys(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchClassroomKeys = useDebouncedCallback(fetchClassroomKeys)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    debouncedFetchClassroomKeys({ page: selected })
  }

  const search = () => {
    debouncedFetchClassroomKeys({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchClassroomKeys()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchClassroomKeys(dataTemp)
  }

  const handleBlockKey = async (key: TClassroomKey) => {
    const check = await Alert.confirm(
      `Bạn có nhưng hoạt động khóa ${key.name} không?`,
      'Có',
      'Không',
    )
    if (!check) {
      return
    }

    showLoading()
    classroomService
      .keyBlock(id, key.id)
      .then(() => {
        Toast.success('Vô hiệu hóa khóa thành công')
        debouncedFetchClassroomKeys()
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleActiveKey = async (key: TClassroomKey) => {
    const check = await Alert.confirm(`Bạn có muốn mở khóa ${key?.name} không?`, 'Có', 'Không')
    if (!check) {
      return
    }
    showLoading()
    classroomService
      .keyActive(id, key.id)
      .then(() => {
        Toast.success('Mở key thành công')
        debouncedFetchClassroomKeys()
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.CLASSROOM.INDEX)
    debouncedFetchClassroomKeys()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Danh sách mã vào lớp</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <SearchForm
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          onReset={resetDataSearch}
          onSearch={search}
        />
        <Table
          columns={columns}
          rows={keys}
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

export default ClassroomKey
