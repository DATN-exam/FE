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
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="px-6 py-5 flex justify-between items-center">
        <h1 className="font-medium text-2xl text-foreground">Lớp học của tôi</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 flex justify-center items-center bg-transparent border-none hover:bg-transparent hover:text-primary gap-2">
              <i className="fa-regular fa-ellipsis"></i>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem>
              <button
                className="w-full flex items-center gap-3 text-base"
                onClick={handleJoinClassroom}
              >
                <div className="flex justify-center items-center w-6">
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
              className="shadow p-4 w-56 rounded bg-card border space-y-6 hover:bg-accent"
              title={classroom.name ?? ''}
            >
              <div className="flex justify-center">
                <img
                  className="w-16 h-16 object-contain rounded"
                  alt={classroom.name ?? ''}
                  loading="lazy"
                  src={
                    classroom.avatar ??
                    'https://cdn.discordapp.com/attachments/858695320753012789/1189189524312571984/user-avatar-default.png?ex=6630ea0c&is=661e750c&hm=9c27dfdba4c6a1a223538565c22d7c23b18980b7613f8321b071dd2d872a3b4f&'
                  }
                />
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <div className="flex-1">
                  <p className="text-sm text-ellipsis line-clamp-2">{classroom.name}</p>
                </div>
                <div className="flex justify-center items-center w-4 h-5 hover:text-primary">
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
