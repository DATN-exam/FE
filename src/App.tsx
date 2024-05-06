import { Suspense } from 'react'
import Routes from './routes'
import { LoadingOverlay } from './components/ui'
import LoadingProvider from './providers/LoadingProvider'
import SidebarActiveProvider from './providers/SidebarActiveProvider'
import AuthAdminProvider from './providers/AuthAdminProvider'
import AuthProvider from './providers/AuthProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { appConfig } from './config/app'
import ThemeProvider from './providers/ThemeProvider'
import DatePickerProvider from './providers/DatePickerProvider'

function App() {
  return (
    <>
      <ThemeProvider>
        <LoadingProvider>
          <GoogleOAuthProvider clientId={appConfig.google.clientId}>
            <DatePickerProvider>
              <SidebarActiveProvider>
                <AuthAdminProvider>
                  <AuthProvider>
                    <Suspense fallback={<LoadingOverlay open />}>
                      <Routes />
                    </Suspense>
                  </AuthProvider>
                </AuthAdminProvider>
              </SidebarActiveProvider>
            </DatePickerProvider>
          </GoogleOAuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </>
  )
}

export default App
