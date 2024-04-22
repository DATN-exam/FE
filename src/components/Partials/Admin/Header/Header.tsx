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
        'p-2 border-b ml-0 md:ml-64 fixed top-0 right-0 left-0 bg-card text-foreground duration-200 z-30 flex justify-between items-center nav-header',
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
