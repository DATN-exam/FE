import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useEffect } from 'react'
import Sidebar from './Sidebar'

function Classroom() {
  const { setSidebarActive } = useSidebarActive()

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.HOME)
  }, [])

  return (
    <section className="grid h-full grid-cols-4">
      <Sidebar />
    </section>
  )
}

export default Classroom
