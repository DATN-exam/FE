import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'
import { Header, Sidebar } from '@/components/Partials/Site'
import { appConfig } from '@/config/app'
import Pusher from 'pusher-js'
import { notification } from 'antd'
import { NotificationPopup } from '@/components/ui'

const MainLayout = () => {
  const { authToken, authProfile } = useAuth()
  const [api, contextHolder] = notification.useNotification()
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(authToken)
  }, [])

  useEffect(() => {
    if (!authProfile) {
      return
    }
    const pusher = new Pusher(appConfig.pusher.appKey, {
      cluster: appConfig.pusher.cluster,
      channelAuthorization: {
        endpoint: appConfig.pusher.endpoint,
        transport: 'jsonp',
        params: {
          token: authToken,
        },
      },
    })
    const channel = pusher.subscribe(`private-App.Models.User.${authProfile.id}`)
    channel.bind('user-notification', function (data: any) {
      openNotification(data.message)
    })
  }, [authProfile])

  const openNotification = (message: any) => {
    api.open({
      message: <h1 className="text-xl font-bold">Bạn có 1 thông báo mới</h1>,
      description: <NotificationPopup message={message} />,
      duration: 0,
      placement: 'bottomLeft',
    })
  }

  useEffect(() => {
    setIsChecking(true)

    if (!authToken) {
      navigate(ROUTES_SITE.AUTH.LOGIN)
    } else if (!authProfile) {
      return
    }
    setIsChecking(false)
  }, [authToken, authProfile])

  return (
    !isChecking && (
      <div className="bg-secondary min-h-screen dark:bg-card">
        <Header />
        <main className="fixed top-[57px] bottom-0 left-0 right-0 flex">
          <Sidebar />
          <div className="bg-background flex-1 dark:bg-secondary overflow-auto">
            <Outlet />
          </div>
        </main>
        {contextHolder}
      </div>
    )
  )
}

export default MainLayout
