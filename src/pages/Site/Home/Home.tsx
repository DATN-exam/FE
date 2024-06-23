import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Pagination,
  Toast,
} from '@/components/ui'
import { DEFAULT_PAGINATION_OBJECT } from '@/config/define'
import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import useHandleError from '@/hooks/useHandleError'
import classroomService from '@/services/site/classroomService'
import { TSetPagination } from '@/types'
import { TClassroom } from '@/types/site'
import { setPaginationData } from '@/utils/pagination'
import authBackground from '@/assets/student-auth-bg.jpg'

function Home() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [classrooms, setClassrooms] = useState<TClassroom[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)

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

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    fetchClassrooms({ page: selected })
  }

  const handleJoinClassroom = async () => {
    const key = await Alert.inputText('Nhập mã vào lớp học', 'Mã')
    if (!key) {
      return
    }
    classroomService
      .join(key)
      .then(data => {
        console.log(data)
        Toast.success('Tham gia lớp học thành công')
        fetchClassrooms()
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.HOME)
    fetchClassrooms()
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-medium text-foreground">Lớp học của tôi</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center gap-2 border-none bg-transparent p-2 hover:bg-transparent hover:text-primary">
              <i className="fa-regular fa-ellipsis"></i>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem>
              <button
                className="flex w-full items-center gap-3 text-base"
                onClick={handleJoinClassroom}
              >
                <div className="flex w-6 items-center justify-center">
                  <i className="fa-solid fa-users-medical"></i>
                </div>
                <span>Tham gia lớp học</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <hr />
      <div className="px-6 py-5">
        <div className="flex flex-wrap gap-4">
          {classrooms.map(classroom => (
            <Link
              key={classroom.id}
              to={ROUTES_SITE.CLASROOM.INDEX.replace(':classroomId', classroom.id ?? '')}
              className="w-56 space-y-6 rounded border bg-card p-4 shadow hover:bg-accent"
              title={classroom.name ?? ''}
            >
              <div className="flex justify-center">
                <img
                  className="h-16 w-16 rounded object-cover"
                  alt={classroom.name ?? ''}
                  loading="lazy"
                  src={classroom.avatar ?? authBackground}
                />
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <div className="flex-1">
                  <p className="line-clamp-2 text-ellipsis text-sm">{classroom.name}</p>
                </div>
                <div className="flex h-5 w-4 items-center justify-center hover:text-primary">
                  <i className="fa-regular fa-ellipsis"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 px-6 py-5">
        <Pagination
          pageCount={pagination.lastPage ?? 0}
          currentPage={pagination.currentPage ?? 0}
          onChangePage={handleChangePage}
        />
      </div>
    </section>
  )
}

export default Home
