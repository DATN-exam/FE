import { Link } from 'react-router-dom'
import { ROUTES_ADMIN } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { SidebarProps } from '@/types/admin'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    to: ROUTES_ADMIN.DASHBOARD,
    icon: 'fa-light fa-gauge-max',
    iconActive: 'fa-solid fa-gauge-max',
    text: 'Dashboard',
  },
  {
    to: ROUTES_ADMIN.TEACER_REGISTRATION,
    icon: 'fa-light fa-person-circle-check',
    iconActive: 'fa-solid fa-person-circle-check',
    text: 'Duyệt giáo viên',
  },
  {
    to: ROUTES_ADMIN.TEACHER,
    icon: 'fa-light fa-chalkboard-user',
    iconActive: 'fa-solid fa-chalkboard-user',
    text: 'Giáo viên',
  },
  {
    to: ROUTES_ADMIN.STUDENT,
    icon: 'fa-light fa-graduation-cap',
    iconActive: 'fa-solid fa-graduation-cap',
    text: 'Học sinh',
  },
]

const Sidebar = (props: SidebarProps) => {
  const { isShowSidebar, hideSidebar } = props
  const { sidebarActive } = useSidebarActive()

  return (
    <aside
      className={cn(
        'fixed bottom-0 top-0 z-50 w-64 bg-primary duration-200 dark:bg-card md:ml-0',
        isShowSidebar ? 'ml-0' : '-ml-64',
      )}
    >
      <Link to={ROUTES_ADMIN.DASHBOARD} className="w-100 block border-b px-2 py-2.5 text-center">
        <span className="text-3xl font-bold text-primary-foreground dark:text-card-foreground">
          Exams Admin
        </span>
      </Link>
      <ul className="flex flex-col gap-2 p-2">
        {NAV_ITEMS.map((item, index) => {
          const isActive = sidebarActive == item.to
          const linkClassName = isActive
            ? 'bg-secondary text-secondary-foreground dark:bg-primary dark:text-primary-foreground'
            : 'text-primary-foreground hover:bg-accent hover:text-secondary-foreground dark:text-card-foreground'
          return (
            <li key={index}>
              <Link
                to={item.to}
                className={cn('text-md flex items-center gap-3 rounded px-4 py-2.5', linkClassName)}
                onClick={() => hideSidebar()}
              >
                <div className="flex w-7 items-center justify-center text-xl">
                  <i className={isActive ? item.iconActive : item.icon}></i>
                </div>
                <p>{item.text}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
