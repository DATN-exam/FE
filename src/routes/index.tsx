import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import adminRoute from './adminRoute'
import siteRoute from './siteRoute'

const router = createBrowserRouter([...siteRoute, ...adminRoute])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
