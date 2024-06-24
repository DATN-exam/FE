import { useEffect } from 'react'
import { useSidebarActive } from '@/contexts/sidebarActive'

const Forbidden = () => {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive('')
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <div className="flex items-center">
          <p className="text-8xl font-light text-yellow-500">403</p>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center justify-center gap-2 text-2xl md:justify-start">
            <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i>
            <h1>Truy cập bị từ chối</h1>
          </div>
          <p>Bạn không có quyền truy cập vào tài nguyên này.</p>
        </div>
      </div>
    </div>
  )
}

export default Forbidden
