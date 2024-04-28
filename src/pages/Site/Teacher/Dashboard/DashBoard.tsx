import { useEffect } from 'react'
import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.TEACHER.DASHBOARD)
  }, [])

  return (
    <>
      <h1 className="text-3xl text-foreground">Dashboard</h1>
    </>
  )
}

export default Dashboard
