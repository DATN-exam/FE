import { ROUTES_ADMIN } from '@/config/routes'
import { MainLayout } from '@/components/Layouts/Admin'
import { Dashboard, Student, Teacher, TeacherRegistration } from '@/pages/Admin'
import { Login, Profile } from '@/pages/Admin/Auth'

const adminRoute = [
  {
    path: ROUTES_ADMIN.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_ADMIN.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES_ADMIN.AUTH.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES_ADMIN.TEACER_REGISTRATION,
        element: <TeacherRegistration />,
      },
      {
        path: ROUTES_ADMIN.TEACHER,
        element: <Teacher />,
      },
      {
        path: ROUTES_ADMIN.STUDENT,
        element: <Student />,
      },
    ],
  },
  {
    path: ROUTES_ADMIN.AUTH.LOGIN,
    element: <Login />,
  },
]

export default adminRoute
