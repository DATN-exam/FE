import { useMemo, useState } from 'react'
import { SidebarActiveContext } from '@/contexts/sidebarActive'
import { SidebarActiveProviderProps } from '@/types'

const SidebarActiveProvider = (props: SidebarActiveProviderProps) => {
  const { children } = props
  const [sidebarActive, setSidebarActive] = useState('')

  const value = useMemo(
    () => ({
      sidebarActive,
      setSidebarActive: (value: string) => setSidebarActive(value),
    }),
    [sidebarActive],
  )

  return <SidebarActiveContext.Provider value={value}>{children}</SidebarActiveContext.Provider>
}

export default SidebarActiveProvider
