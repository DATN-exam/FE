import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'
import studentAuthBg from '@/assets/student-auth-bg.jpg'

const AuthLayout = () => {
  const { authToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authToken) {
      navigate(ROUTES_SITE.HOME, { replace: true })
    }
  }, [authToken])

  return (
    <div className="w-full md:grid md:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center bg-secondary py-20">
        <div className="mx-auto w-[350px] gap-6">
          <Outlet />
        </div>
      </div>
      <div className="sticky bottom-0 right-0 top-0 hidden h-screen bg-muted md:block">
        <img
          src={studentAuthBg}
          alt="image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default AuthLayout
