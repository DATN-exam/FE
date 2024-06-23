import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE, ROUTES_TEACHER } from '@/config/routes'
import { Header, Sidebar } from '@/components/Partials/Teacher'
import { ROLE } from '@/config/define'
import { Alert } from '@/components/ui'

const MainLayout = () => {
  const { authToken, authProfile } = useAuth()
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const location = useLocation()
  const currentRoute = location.pathname
  const navigate = useNavigate()

  const showSidebar = () => setIsShowSidebar(true)
  const hideSidebar = () => setIsShowSidebar(false)

  useEffect(() => {
    setIsChecking(true)

    if (!authToken) {
      navigate(ROUTES_SITE.AUTH.LOGIN)
    } else if (!authProfile) {
      return
    } else if (authProfile?.role != ROLE.TEACHER) {
      navigate(ROUTES_SITE.HOME, { replace: true })
      Alert.alert('Bạn chưa phải là giáo viên!', 'Bạn không có quyền truy cập trang này', 'warning')
    } else if (currentRoute == ROUTES_TEACHER.HOME) {
      navigate(ROUTES_TEACHER.DASHBOARD, { replace: true })
    }

    setIsChecking(false)
  }, [authToken, authProfile, currentRoute])

  return (
    !isChecking && (
      <div className="bg-secondary">
        <Header showSidebar={showSidebar} />
        <Sidebar isShowSidebar={isShowSidebar} hideSidebar={hideSidebar} />
        <main className="relative z-10 ml-0 min-h-screen px-3 pb-10 pt-20 duration-200 md:ml-64 md:px-6">
          <Outlet />
        </main>
        {isShowSidebar && (
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-gray-500 opacity-75 md:hidden"
            onClick={() => hideSidebar()}
          ></div>
        )}
      </div>
    )
  )
}

export default MainLayout
