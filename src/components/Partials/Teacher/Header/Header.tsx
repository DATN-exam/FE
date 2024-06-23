import { ROUTES_ADMIN } from '@/config/routes'
import { HeaderProps } from '@/types/admin'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ToggleTheme } from '@/components/ui'
import './Header.css'

const Header = (props: HeaderProps) => {
  const { showSidebar } = props

  return (
    <nav
      className={cn(
        'nav-header fixed left-0 right-0 top-0 z-30 ml-0 flex items-center justify-between border-b bg-card p-2 text-foreground duration-200 md:ml-64',
      )}
    >
      <ul className="flex items-center">
        <li className="block md:hidden">
          <button type="button" className="text-xl" onClick={() => showSidebar()}>
            <i className="fa-regular fa-bars"></i>
          </button>
        </li>
        <li>
          <Link to={ROUTES_ADMIN.DASHBOARD}>Home</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>
      <ToggleTheme />
    </nav>
  )
}

export default Header
