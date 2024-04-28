import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'
import { Header, Sidebar } from '@/components/Partials/Site/Teacher'
import { ROLE } from '@/config/define'
import { Toast } from '@/components/ui'

const TeacherLayout = () => {
  const { authToken, authProfile } = useAuth()
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
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
      Toast.error('Cút ra ngoài...')
    }

    setIsChecking(false)
  }, [authToken, authProfile])

  return (
    !isChecking && (
      <div className="bg-secondary">
        <Header showSidebar={showSidebar} />
        <Sidebar isShowSidebar={isShowSidebar} hideSidebar={hideSidebar} />
        <main className="pt-20 px-3 pb-10 md:px-6 ml-0 md:ml-64 min-h-screen duration-200 relative z-10">
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
  )
}

export default TeacherLayout
