import { useEffect } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import Char1 from './Char1'
import Char2 from './Char2'
import Char3 from './Char3'

function Dashboard() {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.DASHBOARD)
  }, [])

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl text-foreground">Dashboard</h1>
        <div className="bg-card rounded p-5 shadow space-y-10">
          <Char1 />
          <Char3 />
          <Char2 />
        </div>
      </div>
    </>
  )
}

export default Dashboard
