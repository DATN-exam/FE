import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect } from 'react'
import userAvatarDefault from '@/assets/user-avatar-default.png'
import { Link } from 'react-router-dom'

const Activity = () => {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.ACTIVITY)
  }, [])

  return (
    <section className="p-5 px-3 md:p-10">
      {/* Chưa xem */}
      <Link
        to="#"
        className="flex justify-center items-center gap-2 md:gap-5 w-full hover:bg-accent p-3 rounded-lg"
      >
        <img
          src={userAvatarDefault}
          alt=""
          className="size-14 md:size-20 aspect-square object-cover rounded-full"
        />
        <div className="flex-1 flex flex-col gap-2">
          <div className="break-all">
            <strong>Nguyễn Đắc Toàn</strong> đã thông báo với bạn
            dfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfd
          </div>
          <p className="text-sm text-primary">1 ngày trước</p>
        </div>
        <div className="flex justify-center items-center text-primary text-sm">
          <i className="fa-solid fa-circle"></i>
        </div>
      </Link>

      {/* Đã xem */}
      <Link
        to="#"
        className="flex justify-center items-center gap-2 md:gap-5 w-full hover:bg-accent p-3 rounded-lg"
      >
        <img
          src={userAvatarDefault}
          alt=""
          className="size-14 md:size-20 aspect-square object-cover rounded-full"
        />
        <div className="flex-1 flex flex-col gap-2">
          <div className="break-all">
            <strong>Nguyễn Đắc Toàn</strong> đã thông báo với bạn
            dfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfddfgsfd
          </div>
          <p className="text-sm">1 ngày trước</p>
        </div>
      </Link>
    </section>
  )
}

export default Activity
