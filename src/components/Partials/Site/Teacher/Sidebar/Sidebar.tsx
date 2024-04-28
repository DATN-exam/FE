import { Link } from 'react-router-dom'
import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useLoading } from '@/contexts/loading'
import { SidebarProps } from '@/types/admin'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth'

const NAV_ITEMS = [
  {
    to: ROUTES_SITE.TEACHER.DASHBOARD,
    icon: 'fa-light fa-gauge-max',
    iconActive: 'fa-solid fa-gauge-max',
    text: 'Dashboard',
  },
]

const Sidebar = (props: SidebarProps) => {
  const { isShowSidebar, hideSidebar } = props
  const { sidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { authLogout } = useAuth()

  const logout = () => {
    showLoading()
    authLogout().finally(() => {
      hideLoading()
    })
  }

  return (
    <aside
      className={cn(
        'fixed top-0 bottom-0 duration-200 w-64 z-50 md:ml-0 bg-primary dark:bg-card',
        isShowSidebar ? 'ml-0' : '-ml-64',
      )}
    >
      <Link
        to={ROUTES_SITE.TEACHER.DASHBOARD}
        className="px-2 py-2.5 block w-100 border-b text-center"
      >
        <span className="text-primary-foreground dark:text-card-foreground text-3xl font-bold">
          Exams Teacher
        </span>
      </Link>
      <ul className="p-2 flex flex-col gap-2">
        {NAV_ITEMS.map((item, index) => {
          const isActive = sidebarActive == item.to
          const linkClassName = isActive
            ? 'bg-secondary text-secondary-foreground dark:bg-primary dark:text-primary-foreground'
            : 'text-primary-foreground hover:bg-accent hover:text-secondary-foreground dark:text-card-foreground'
          return (
            <li key={index}>
              <Link
                to={item.to}
                className={cn('flex items-center gap-3 text-md px-4 py-2.5 rounded', linkClassName)}
                onClick={() => hideSidebar()}
              >
                <div className="flex justify-center items-center text-xl w-7">
                  <i className={isActive ? item.iconActive : item.icon}></i>
                </div>
                <p>{item.text}</p>
              </Link>
            </li>
          )
        })}
        <li>
          <button
            type="button"
            className="flex w-full items-center gap-3 text-md px-4 py-2.5 rounded text-primary-foreground hover:bg-accent hover:text-secondary-foreground dark:text-card-foreground"
            onClick={logout}
          >
            <div className="flex justify-center items-center text-xl w-7">
              <i className="fa-light fa-right-from-bracket"></i>
            </div>
            <p>Đăng xuất</p>
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
