import { ROUTES_SITE } from '@/config/routes'
import { MainLayout, AuthLayout } from '@/components/Layouts/Site'
import { ForgotPassword, Login, Profile, Register, ResetPassword, Verify } from '@/pages/Site/Auth'
import { Home } from '@/pages/Site'
import { Classroom } from '@/pages/Site'
import { Exam } from '@/pages/Site'

const siteRoute = [
  {
    path: ROUTES_SITE.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_SITE.HOME,
        element: <Home />,
      },
      {
        path: ROUTES_SITE.CLASROOM.INDEX,
        element: <Classroom />,
      },
      {
        path: ROUTES_SITE.CLASROOM.EXAM,
        element: <Exam />,
      },
      {
        path: ROUTES_SITE.AUTH.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES_SITE.AUTH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES_SITE.AUTH.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES_SITE.AUTH.VERIFY,
        element: <Verify />,
      },
      {
        path: ROUTES_SITE.AUTH.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ROUTES_SITE.AUTH.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
]

export default siteRoute
