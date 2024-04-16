import React, { useContext } from 'react'

export const SidebarActiveContext = React.createContext<any>(null)

export const useSidebarActive = () => useContext(SidebarActiveContext)
