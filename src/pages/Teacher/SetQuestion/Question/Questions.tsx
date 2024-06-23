import { useEffect, useState } from 'react'
import { Badge, Button, Table } from '@/components/ui'
import {
  DEFAULT_PAGINATION_OBJECT,
  QUESTION_LEVEL_LIST_OPTIONS,
  QUESTION_STATUS_LIST_OPTIONS,
  QUESTION_TYPE_LIST_OPTIONS,
  SORT_TYPE,
} from '@/config/define'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TSortOrder, TTableColumn } from '@/types'
import { setPaginationData } from '@/utils/pagination'
import SearchForm from './SearchForm'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import { getValueFromObjectByKey } from '@/utils/helper'
import { QuestionSearchParams, TQuestion } from '@/types/teacher/question'
import { Drawer } from 'antd'
import questionService from '@/services/teacher/questionService'
import UpdateForm from './UpdateForm'
import AddForm from './AddForm'

const defaultValueDataSearch: QuestionSearchParams = {
  question: '',
  status: '',
  type: '',
  is_testing: null,
  sort_column: 'id',
  sort_type: SORT_TYPE.DESC,
}

function Questions() {
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)
  const [questionUpdate, setQuestionUpdate] = useState<TQuestion | null>(null)
  const [openFormUpdate, setOpenFormUpdate] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Câu hỏi',
      field: 'question',
      sortable: true,
      valueGetter: row => {
        return (
          <>
            <div
              className="editor-content max-h-24 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: row.question }}
            />
          </>
        )
      },
    },
    {
      headerName: 'Loại',
      field: 'type',
      sortable: true,
      valueGetter: row => {
        const status = getValueFromObjectByKey(QUESTION_TYPE_LIST_OPTIONS, 'value', row.type)
        return status.name
      },
    },
    {
      headerName: 'Câu hỏi thử',
      field: 'is_testing',
      sortable: true,
      valueGetter: row => (row.is_testing ? <p>Câu hỏi thử</p> : <p>Câu hỏi thật</p>),
    },
    {
      headerName: 'Độ khó',
      field: 'level',
      sortable: true,
      valueGetter: row => {
        const level = getValueFromObjectByKey(QUESTION_LEVEL_LIST_OPTIONS, 'value', row.level)
        return <Badge className={level?.badgeColor}>{level.name}</Badge>
      },
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      sortable: true,
      valueGetter: row => {
        const status = getValueFromObjectByKey(QUESTION_STATUS_LIST_OPTIONS, 'value', row.status)
        return <Badge className={status?.badgeColor}>{status.name}</Badge>
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
      valueGetter: row => {
        return (
          <Button onClick={() => handleUpdateQuestion(row)}>
            <i className="fa-solid fa-message-pen"></i>
          </Button>
        )
      },
    },
  ]

  const handleUpdateQuestion = (row: TQuestion) => {
    setQuestionUpdate(row)
    setOpenFormUpdate(true)
  }

  const fetchQuestions = (params?: any) => {
    showLoading()
    questionService
      .getList(id, params)
      .then(({ data, meta }) => {
        setQuestions(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchQuestions = useDebouncedCallback(fetchQuestions)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    setDataSearch({ ...dataSearch, page: selected })
    debouncedFetchQuestions({ page: selected })
  }

  const search = () => {
    debouncedFetchQuestions({ ...dataSearch, page: 1 })
  }

  const resetDataSearch = () => {
    setDataSearch(defaultValueDataSearch)
    debouncedFetchQuestions()
  }

  const sort = (dataSort: TSortOrder) => {
    const dataTemp = { ...dataSearch, ...dataSort }
    setDataSearch(dataTemp)
    debouncedFetchQuestions(dataTemp)
  }

  const handleCreateQuestion = () => {
    setOpenFormAdd(true)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.SET_QUESTION.INDEX)
    debouncedFetchQuestions()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Danh sách câu hỏi</h1>
      <div className="space-y-6 rounded bg-card p-5 shadow">
        <div className="flex justify-end">
          <Button onClick={handleCreateQuestion}>Tạo câu hỏi</Button>
        </div>
        <SearchForm
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          onReset={resetDataSearch}
          onSearch={search}
        />
        <Table
          columns={columns}
          rows={questions}
          pagination={pagination}
          defaultSortColumn={defaultValueDataSearch.sort_column}
          defaultSortType={defaultValueDataSearch.sort_type}
          onSort={sort}
          handleChangePage={selected => handleChangePage(selected)}
        />
      </div>
      <Drawer
        title="Chỉnh sửa câu hỏi"
        width={1080}
        onClose={() => setOpenFormUpdate(false)}
        open={openFormUpdate}
        destroyOnClose={true}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <UpdateForm
          showLoading={showLoading}
          hideLoading={hideLoading}
          fetchQuestions={fetchQuestions}
          dataSearch={dataSearch}
          setOpenForm={setOpenFormUpdate}
          question={questionUpdate}
          pagination={pagination}
        />
      </Drawer>

      <Drawer
        title="Thêm câu hỏi"
        width={1080}
        onClose={() => setOpenFormAdd(false)}
        open={openFormAdd}
        destroyOnClose={true}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <AddForm
          showLoading={showLoading}
          hideLoading={hideLoading}
          fetchQuestions={fetchQuestions}
          dataSearch={dataSearch}
          setOpenForm={setOpenFormAdd}
          pagination={pagination}
        />
      </Drawer>
    </div>
  )
}

export default Questions
