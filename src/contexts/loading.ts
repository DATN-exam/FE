import React, { useContext } from 'react'

export const LoadingContext = React.createContext<any>(null)

export const useLoading = () => useContext(LoadingContext)
