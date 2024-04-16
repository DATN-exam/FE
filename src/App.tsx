import { Suspense } from 'react'
import Routes from './routes'
import { LoadingOverlay } from './components/ui'
import LoadingProvider from './providers/LoadingProvider'
import SidebarActiveProvider from './providers/SidebarActiveProvider'
import AuthAdminProvider from './providers/AuthAdminProvider'

function App() {
  return (
    <>
      <LoadingProvider>
        <SidebarActiveProvider>
          <AuthAdminProvider>
            <Suspense fallback={<LoadingOverlay open />}>
              <Routes />
            </Suspense>
          </AuthAdminProvider>
        </SidebarActiveProvider>
      </LoadingProvider>
    </>
  )
}

export default App
