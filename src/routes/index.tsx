import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import adminRoute from './adminRoute'
import siteRoute from './siteRoute'
import teacherRoute from './teacherRoute'

const router = createBrowserRouter([...siteRoute, ...teacherRoute, ...adminRoute])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
