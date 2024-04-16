import { Button, Input } from '@/components/ui'
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
      <h1>Dashboard</h1>
      <Button>Click</Button>
      <Input />
    </>
  )
}

export default Dashboard
