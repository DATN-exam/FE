import { ROUTES_ADMIN } from '@/config/routes'
import { HeaderProps } from '@/types/admin'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToggleTheme,
} from '@/components/ui'
import { useAuthAdmin } from '@/contexts/authAdmin'
import userAvatarDefault from '@/assets/user-avatar-default.png'
import { useLoading } from '@/contexts/loading'
import './Header.css'

const Header = (props: HeaderProps) => {
  const { showSidebar } = props
  const { authProfile, authLogout } = useAuthAdmin()
  const { showLoading, hideLoading } = useLoading()

  const logout = () => {
    showLoading()
    authLogout().finally(() => {
      hideLoading()
    })
  }

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
        <li className="hidden md:block">
          <Link to={ROUTES_ADMIN.DASHBOARD}>Home</Link>
        </li>
        <li className="hidden md:block">
          <Link to="#">Contact</Link>
        </li>
      </ul>
      <div className="flex items-center gap-1">
        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-fit rounded-full border-none bg-secondary p-0 pl-3 hover:bg-background"
            >
              <div className="flex items-center gap-2 rounded-full">
                <p className="text-sm font-normal">{`${authProfile?.first_name} ${authProfile?.last_name}`}</p>
                <img src={userAvatarDefault} alt="user-avatar" className="h-10 w-10 rounded-full" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem>
              <Link
                className="flex w-full items-center gap-3 text-base"
                to={ROUTES_ADMIN.AUTH.PROFILE}
              >
                <div className="flex w-6 items-center justify-center">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span>Thông tin cá nhân</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex w-full items-center gap-3 text-base" onClick={() => logout()}>
                <div className="flex w-6 items-center justify-center">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <span>Đăng xuất</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Header
