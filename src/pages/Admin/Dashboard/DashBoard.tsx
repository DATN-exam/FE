import { ROUTES_ADMIN } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect } from 'react'

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_ADMIN.DASHBOARD)
  }, [])

  return (
    <>
      <h1 className="text-3xl text-foreground">Dashboard</h1>
    </>
  )
}

export default Dashboard
