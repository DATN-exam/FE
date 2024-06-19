import { ROUTES_SITE } from '@/config/routes'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  {
    to: ROUTES_SITE.ACTIVITY,
    icon: 'fa-light fa-bell',
    iconActive: 'fa-solid fa-bell',
    text: 'Hoạt động',
  },
  {
    to: ROUTES_SITE.HOME,
    icon: 'fa-light fa-user-group',
    iconActive: 'fa-solid fa-user-group',
    text: 'Lớp học của tôi',
  },
]

function Sidebar() {
  const { sidebarActive } = useSidebarActive()

  return (
    <aside className="w-[70px] border-e">
      <ul className="pl-1 flex flex-col">
        {NAV_ITEMS.map((item, index) => {
          const isActive = sidebarActive == item.to
          const linkClassName = isActive
            ? 'text-primary border-l-2 border-primary'
            : 'text-foreground hover:text-primary'
          return (
            <li key={index}>
              <Link
                to={item.to}
                className={cn(
                  'flex flex-col justify-center gap-1 px-1 py-3 text-xs hover:bg-background dark:hover:bg-accent',
                  linkClassName,
                )}
              >
                <div className="flex justify-center items-center text-lg">
                  <i className={isActive ? item.iconActive : item.icon}></i>
                </div>
                <p className="text-center font-light">{item.text}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
