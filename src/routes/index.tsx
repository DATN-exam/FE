import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES_ADMIN, ROUTES_SITE } from '@/config/routes'

// Admin
const LoginAdmin = lazy(() => import('@/pages/Admin/Auth/Login'))
const MainLayoutAdmin = lazy(() => import('@/components/Layouts/Admin/MainLayout'))
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))

// User
const MainLayout = lazy(() => import('@/components/Layouts/Site/MainLayout'))
const AuthLayout = lazy(() => import('@/components/Layouts/Site/AuthLayout'))
const Login = lazy(() => import('@/pages/Site/Auth/Login'))
const Register = lazy(() => import('@/pages/Site/Auth/Register'))
const Home = lazy(() => import('@/pages/Site/Home'))

const router = createBrowserRouter([
  // Admin
  {
    path: ROUTES_ADMIN.HOME,
    element: <MainLayoutAdmin />,
    children: [
      {
        path: ROUTES_ADMIN.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: ROUTES_ADMIN.AUTH.LOGIN,
    element: <LoginAdmin />,
  },
  // Site
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_SITE.HOME,
        element: <Home />,
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
    ],
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
