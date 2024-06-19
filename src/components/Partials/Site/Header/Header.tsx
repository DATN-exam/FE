import { ToggleTheme } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
import { Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import AccountMenu from './AccountMenu'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 flex justify-between items-center gap-5 border-b text-foreground">
      <Link to={ROUTES_SITE.HOME} className="w-[58px] flex justify-center">
        <img src={viteLogo} alt="Logo" />
      </Link>
      <div className="flex items-center gap-1">
        <ToggleTheme />
        <AccountMenu />
      </div>
    </header>
  )
}

export default Header
