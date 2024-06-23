import { useEffect, useState } from 'react'
import { Table, Badge, Button } from '@/components/ui'
import { DEFAULT_PAGINATION_OBJECT, SET_QUESTION_LIST_OPTIONS, SORT_TYPE } from '@/config/define'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import { getValueFromObjectByKey } from '@/utils/helper'
import SearchForm from './SearchForm'
import CreateForm from './CreateForm'
import { Tooltip } from 'react-tooltip'
import { Drawer } from 'antd'
import { SetQuestionSearchParams, TSetQuestion } from '@/types/teacher/setQuestion'
import setQuestionService from '@/services/teacher/setQuestionService'
import { Link } from 'react-router-dom'

const defaultValueDataSearch: SetQuestionSearchParams = {
  title: '',
  status: '',
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function SetQuestion() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [setQuestions, setSetQuestion] = useState<TSetQuestion[]>([])
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
      field: 'title',
      sortable: true,
    },
    {
      headerName: 'Số lượng câu hỏi',
      field: 'quantity_question',
      // sortable: true,
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
      headerName: 'Ghi chú',
      field: 'note',
      valueGetter: row => (
        <>
          <button id={`not-note-${row.id}`} className="text-2xl">
            <i className="fa-light fa-circle-ellipsis"></i>
          </button>
          <Tooltip anchorSelect={`#not-note-${row.id}`} place="top-end">
            <p className="max-w-28">{row.note}</p>
          </Tooltip>
        </>
      ),
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        const status = getValueFromObjectByKey(SET_QUESTION_LIST_OPTIONS, 'value', row.status)
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
      valueGetter: row => {
        return (
          <Link
            to={ROUTES_TEACHER.SET_QUESTION.UPDATE.replace(':id', row.id)}
            className="underline"
          >
            <Button>
              <i className="fa-sharp fa-solid fa-eye"></i>
            </Button>
          </Link>
        )
      },
    },
  ]

  const fetchSetQuestions = (params?: any) => {
    showLoading()
    setQuestionService
      .getList(params)
      .then(({ data, meta }) => {
        setSetQuestion(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchSetQuestions = useDebouncedCallback(fetchSetQuestions)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    setDataSearch({ ...dataSearch, page: selected })
    debouncedFetchSetQuestions({ page: selected })
  }

  const search = () => {
    debouncedFetchSetQuestions({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchSetQuestions()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchSetQuestions(dataTemp)
  }

  const handleCreateClassroom = () => {
    setOpenFormAdd(true)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.SET_QUESTION.INDEX)
    debouncedFetchSetQuestions()
  }, [])

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl text-foreground">Danh sách bộ câu hỏi</h1>
        <div className="space-y-6 rounded bg-card p-5 shadow">
          <div className="flex justify-end">
            <Button onClick={handleCreateClassroom}>Tạo bộ câu hỏi</Button>
          </div>
          <SearchForm
            className="!mt-1"
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            onReset={resetDataSearch}
            onSearch={search}
          />
          <Table
            columns={columns}
            rows={setQuestions}
            pagination={pagination}
            defaultSortColumn={defaultValueDataSearch.sort_column}
            defaultSortType={defaultValueDataSearch.sort_type}
            onSort={sort}
            handleChangePage={selected => handleChangePage(selected)}
          />
        </div>
      </div>
      <Drawer
        title="Tạo lớp học mới"
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
          debouncedFetchClassrooms={debouncedFetchSetQuestions}
          dataSearch={dataSearch}
          setOpenFormAdd={setOpenFormAdd}
        />
      </Drawer>
    </>
  )
}

export default SetQuestion
