import React, { useContext } from 'react'

export const AuthAdminContext = React.createContext<any>(null)

export const useAuthAdmin = () => useContext(AuthAdminContext)
