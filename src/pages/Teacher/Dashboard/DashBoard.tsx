import { useEffect } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.DASHBOARD)
  }, [])

  return (
    <>
      <h1 className="text-3xl text-foreground">Dashboard</h1>
    </>
  )
}

export default Dashboard
