import { useEffect, useState } from 'react'
import { Table, Badge, Button } from '@/components/ui'
import {
  CLASSROOM_STATUS_LIST_OPTIONS,
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
import { getValueFromObjectByKey } from '@/utils/helper'
import { ClassroomSearchParams, TClassroom } from '@/types/teacher'
import classroomService from '@/services/site/teacher/classroomService'
import SearchForm from './SearchForm'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const defaultValueDataSearch: ClassroomSearchParams = {
  name: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function Classroom() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [classrooms, setClassrooms] = useState<TClassroom[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Lớp',
      field: 'name',
      sortable: true,
    },
    {
      headerName: 'Số lượng học sinh',
      field: 'count_student',
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
      field: 'status',
      valueGetter: row => {
        const status = getValueFromObjectByKey(CLASSROOM_STATUS_LIST_OPTIONS, 'value', row.status)
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
      valueGetter: row => {
        return (
          <Link to={ROUTES_TEACHER.CLASSROOM.UPDATE.replace(':id', row.id)} className="underline">
            <Button>
              <i className="fa-sharp fa-solid fa-eye"></i>
            </Button>
          </Link>
        )
      },
    },
  ]

  const fetchClassrooms = (params?: any) => {
    showLoading()
    classroomService
      .getList(params)
      .then(({ data, meta }) => {
        setClassrooms(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchClassrooms = useDebouncedCallback(fetchClassrooms)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    debouncedFetchClassrooms({ page: selected })
  }

  const search = () => {
    debouncedFetchClassrooms({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchClassrooms()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchClassrooms(dataTemp)
  }

  const handleCreateClassroom = () => {
    //
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.CLASSROOM.INDEX)
    debouncedFetchClassrooms()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-foreground">Danh sách lớp học</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <div className="flex justify-between">
          <SearchForm
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            onReset={resetDataSearch}
            onSearch={search}
          />
          <div>
            <Button onClick={handleCreateClassroom}>Tạo lớp</Button>
          </div>
        </div>
        <Table
          columns={columns}
          rows={classrooms}
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

export default Classroom
