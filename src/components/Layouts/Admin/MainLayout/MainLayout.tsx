import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header, Sidebar } from '@/components/Partials/Admin'
import { useAuthAdmin } from '@/contexts/authAdmin'
import { ROUTES_ADMIN, ROUTES_SITE } from '@/config/routes'
import { ROLE } from '@/config/define'

const MainLayout = () => {
  const { authToken, authProfile } = useAuthAdmin()
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname

  const showSidebar = () => setIsShowSidebar(true)
  const hideSidebar = () => setIsShowSidebar(false)

  useEffect(() => {
    setIsChecking(true)

    if (!authToken) {
      navigate(ROUTES_ADMIN.AUTH.LOGIN)
    } else if (!authProfile) {
      return
    } else if (authProfile?.role != ROLE.ADMIN) {
      navigate(ROUTES_SITE.HOME, { replace: true })
    } else if (currentRoute == ROUTES_ADMIN.HOME) {
      navigate(ROUTES_ADMIN.DASHBOARD, { replace: true })
    }

    setIsChecking(false)
  }, [authToken, currentRoute, authProfile])

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
