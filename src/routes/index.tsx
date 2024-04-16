import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES_ADMIN } from '@/config/routes'

const Login = lazy(() => import('@/pages/Admin/Auth/Login'))

const MainLayout = lazy(() => import('@/components/Layouts/Admin/MainLayout'))
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))

const router = createBrowserRouter([
  {
    path: ROUTES_ADMIN.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_ADMIN.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: ROUTES_ADMIN.AUTH.LOGIN,
    element: <Login />,
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
