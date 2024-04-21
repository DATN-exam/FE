import { ROUTES_ADMIN } from '@/config/routes'
import { MainLayout } from '@/components/Layouts/Admin'
import { Dashboard, Teacher } from '@/pages/Admin'
import { Login } from '@/pages/Admin/Auth'

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
        path: ROUTES_ADMIN.TEACHER,
        element: <Teacher />,
      },
    ],
  },
  {
    path: ROUTES_ADMIN.AUTH.LOGIN,
    element: <Login />,
  },
]

export default adminRoute
