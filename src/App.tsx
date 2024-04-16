import { Suspense } from 'react'
import Routes from './routes'
import { LoadingOverlay } from './components/ui'
import LoadingProvider from './providers/LoadingProvider'
import SidebarActiveProvider from './providers/SidebarActiveProvider'
import AuthAdminProvider from './providers/AuthAdminProvider'
import AuthProvider from './providers/AuthProvider'

function App() {
  return (
    <>
      <LoadingProvider>
        <SidebarActiveProvider>
          <AuthAdminProvider>
            <AuthProvider>
              <Suspense fallback={<LoadingOverlay open />}>
                <Routes />
              </Suspense>
            </AuthProvider>
          </AuthAdminProvider>
        </SidebarActiveProvider>
      </LoadingProvider>
    </>
  )
}

export default App
