import React, { useContext } from 'react'

export const AuthContext = React.createContext<any>(null)

export const useAuth = () => useContext(AuthContext)
