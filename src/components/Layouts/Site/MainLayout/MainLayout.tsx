import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'
import Header from '@/components/Partials/Site/Header'

const MainLayout = () => {
  const { authToken, authProfile } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

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
      <div className="bg-secondary min-h-screen">
        <Header />
        <Outlet />
      </div>
    )
  )
}

export default MainLayout
