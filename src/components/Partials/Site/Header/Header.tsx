import { ToggleTheme } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
import { Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import AccountMenu from './AccountMenu'

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-5 border-b p-2 text-foreground">
      <Link to={ROUTES_SITE.HOME} className="flex w-[58px] justify-center">
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
