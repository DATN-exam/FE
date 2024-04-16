import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'

const MainLayout = () => {
  const { authToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authToken) {
      navigate(ROUTES_SITE.AUTH.LOGIN)
    }
  }, [authToken])

  return (
    <div className="wrapper">
      <Outlet />
    </div>
  )
}

export default MainLayout
