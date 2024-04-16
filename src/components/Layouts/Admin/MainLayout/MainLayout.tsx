import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/Partials/Admin/Header'
import Sidebar from '@/components/Partials/Admin/Sidebar'
import { useAuthAdmin } from '@/contexts/authAdmin'
import { ROUTES_ADMIN } from '@/config/routes'

const MainLayout = () => {
  const { authToken } = useAuthAdmin()
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname

  const showSidebar = () => setIsShowSidebar(true)
  const hideSidebar = () => setIsShowSidebar(false)

  useEffect(() => {
    if (!authToken) {
      window.location.href = `/${ROUTES_ADMIN.AUTH.LOGIN}`
    } else if (currentRoute == ROUTES_ADMIN.HOME) {
      navigate(ROUTES_ADMIN.DASHBOARD, { replace: true })
    }
  }, [authToken, currentRoute])

  // useEffect(() => {
  //   if (authProfile?.roles?.length <= 0) {
  //     navigate(ROUTES_SITE.HOME, { replace: true })
  //   }
  // }, [authProfile])

  // useEffect(() => {
  //   apiClient.interceptors.response.use(
  //     response => response,
  //     error => {
  //       const errorStatus = error.status ?? error.response?.status
  //       if (errorStatus === 404) {
  //         navigate(ROUTES_ADMIN.ERRORS.NOT_FOUND, { replace: true })
  //       } else if (errorStatus === 403) {
  //         navigate(ROUTES_ADMIN.ERRORS.FORBIDDEN, { replace: true })
  //       } else if (errorStatus === 500) {
  //         navigate(ROUTES_ADMIN.ERRORS.INTERNAL_SERVER_ERROR, { replace: true })
  //       }
  //       return Promise.reject(error)
  //     },
  //   )
  // }, [])

  return (
    <div className="wrapper bg-gray-200">
      <Header showSidebar={showSidebar} />
      <Sidebar isShowSidebar={isShowSidebar} hideSidebar={hideSidebar} />
      <main className="pt-20 px-3 pb-10 md:px-6 ml-0 md:ml-64 min-h-screen duration-200">
        <Outlet />
      </main>
      {isShowSidebar && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-40 opacity-75 bg-gray-500 md:hidden"
          onClick={() => hideSidebar()}
        ></div>
      )}
    </div>
  )
}

export default MainLayout
