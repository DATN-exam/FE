import { Link } from 'react-router-dom'
import { ROUTES_SITE, ROUTES_TEACHER } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { SidebarProps } from '@/types/admin'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    to: ROUTES_TEACHER.DASHBOARD,
    icon: 'fa-light fa-gauge-max',
    iconActive: 'fa-solid fa-gauge-max',
    text: 'Dashboard',
  },
  {
    to: ROUTES_TEACHER.CLASSROOM.INDEX,
    icon: 'fa-light fa-people-roof',
    iconActive: 'fa-solid fa-people-roof',
    text: 'Lớp học',
  },
  {
    to: ROUTES_TEACHER.SET_QUESTION.INDEX,
    icon: 'fa-light fa-seal-question',
    iconActive: 'fa-solid fa-seal-question',
    text: 'Bộ câu hỏi',
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
      <Link to={ROUTES_TEACHER.DASHBOARD} className="w-100 block border-b px-2 py-2.5 text-center">
        <span className="text-3xl font-bold text-primary-foreground dark:text-card-foreground">
          Exams Teacher
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
        <li>
          <Link
            type="button"
            className="text-md flex w-full items-center gap-3 rounded px-4 py-2.5 text-primary-foreground hover:bg-accent hover:text-secondary-foreground dark:text-card-foreground"
            to={ROUTES_SITE.HOME}
          >
            <div className="flex w-7 items-center justify-center text-xl">
              <i className="fa-light fa-right-from-bracket"></i>
            </div>
            <p>Thoát</p>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
