import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect, useState } from 'react'
import userAvatarDefault from '@/assets/user-avatar-default.png'
import { Link } from 'react-router-dom'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import notificationService from '@/services/site/notificationService'
import { TNotification } from '@/types'
import { Alert } from '@/components/ui'

const Activity = () => {
  const { setSidebarActive } = useSidebarActive()
  const { handleResponseError } = useHandleError()
  const { showLoading, hideLoading } = useLoading()
  const [notifications, setNotifications] = useState<TNotification[]>([])

  const fetchExamHistoryDetail = () => {
    showLoading()
    notificationService
      .getAll()
      .then(data => {
        setNotifications(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const handleOnclick = (notification: TNotification) => {
    if (notification.data?.url) {
      return (window.location.href = notification.data.url)
    }
    if (notification.data?.message) {
      Alert.alert(notification.data?.message, notification.data?.message, 'warning')
    }
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.ACTIVITY)
    fetchExamHistoryDetail()
  }, [])

  return (
    <section className="p-5 px-3 md:p-10">
      {/* Chưa xem */}
      {notifications.map(notification => (
        <div
          key={notification.id}
          onClick={() => handleOnclick(notification)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-3 hover:bg-accent md:gap-5"
        >
          <img
            src={userAvatarDefault}
            alt=""
            className="aspect-square size-14 rounded-full object-cover md:size-20"
          />
          <div className="flex flex-1 flex-col gap-2">
            <div className="break-all">
              {/* <strong>Nguyễn Đắc Toàn</strong> đã thông báo với bạn */}
              {notification.data?.message}
            </div>
            {/* khac */}
            <p className="text-sm text-primary">{notification.time_ago}</p>
          </div>
          <div className="flex items-center justify-center text-sm text-primary">
            <i className="fa-solid fa-circle"></i>
          </div>
        </div>
      ))}

      {/* Đã xem */}
      <Link
        to="#"
        className="flex w-full items-center justify-center gap-2 rounded-lg p-3 hover:bg-accent md:gap-5"
      >
        <img
          src={userAvatarDefault}
          alt=""
          className="aspect-square size-14 rounded-full object-cover md:size-20"
        />
        <div className="flex flex-1 flex-col gap-2">
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
