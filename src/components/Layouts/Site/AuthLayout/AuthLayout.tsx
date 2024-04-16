import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { ROUTES_SITE } from '@/config/routes'

const AuthLayout = () => {
  const { authToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authToken) {
      navigate(ROUTES_SITE.HOME, { replace: true })
    }
  }, [authToken])

  return (
    <div className="w-full min-height-screen md:grid md:grid-cols-2">
      <div className="flex items-center justify-center bg-white py-20">
        <div className="mx-auto grid w-[350px] gap-6">
          <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted md:block h-screen sticky top-0 right-0 bottom-0">
        <img
          src="https://cdn.discordapp.com/attachments/858695320753012789/1229447078984552540/OHR.ChambordCastle_ROW6581384117_1920x1080.jpg?ex=662fb6d1&is=661d41d1&hm=bcefaa0757c370017e78fcbc25b5b1069de936ea356946bb64cf921ca14f7081&"
          alt="image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthLayout
