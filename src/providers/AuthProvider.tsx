import { useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth'
import authService from '@/services/site/authService'
import state from '@/utils/localStorage'
import apiClient from '@/services/site'
import { AuthProviderProps, LoginPayloads, TAuthAdminProfile } from '@/types'

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [authToken, setAuthToken] = useState<string | null>(state.getState('access_token'))
  const [authProfile, setAuthProfile] = useState<TAuthAdminProfile | null>(
    state.getState('user_profile'),
  )

  // Login
  const authLogin = async (data: LoginPayloads) => {
    try {
      const response = await authService.login(data)
      setAuthToken(response.access_token)
    } catch (err) {
      return Promise.reject(err)
      // authRemove()
    }
  }

  // Login with google
  const authLoginWithGoogle = async (data: any) => {
    try {
      const response = await authService.loginWithGoogle(data)
      setAuthToken(response.access_token)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // Logout
  const authLogout = async () => {
    try {
      await authService.logout()
      authRemove()
    } catch (err) {
      authRemove()
      // return Promise.reject(err)
    }
  }

  // Get profile
  const getProfile = async () => {
    try {
      const response = await authService.getProfile()
      setAuthProfile(response)
    } catch (err) {
      authRemove()
      // return Promise.reject(err)
    }
  }

  // Remove token
  const authRemove = () => {
    setAuthToken(null)
    setAuthProfile(null)
  }

  // Auto remove authToken when authToken invalid
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      response => response,
      error => {
        const errorStatus = error.status ?? error.response?.status
        if (errorStatus === 401) {
          authRemove()
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiClient.interceptors.response.eject(interceptor)
    }
  }, [])

  useEffect(() => {
    if (authToken) {
      state.setState('access_token', authToken)
      getProfile()
    } else {
      state.removeState('access_token')
    }
  }, [authToken])

  useEffect(() => {
    if (authProfile) {
      state.setState('user_profile', authProfile)
    } else {
      state.removeState('user_profile')
    }
  }, [authProfile])

  const contextValue = {
    authToken,
    authProfile,
    authLogin,
    authLoginWithGoogle,
    authLogout,
    authRemove,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
