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
      <div className="flex items-center gap-1">
        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-0 pl-3 w-fit bg-secondary rounded-full border-none hover:bg-background"
            >
              <div className="rounded-full flex items-center gap-2">
                <p className="text-sm font-normal">{`${authProfile?.first_name} ${authProfile?.last_name}`}</p>
                <img src={userAvatarDefault} alt="user-avatar" className="w-10 h-10 rounded-full" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem>
              <Link
                className="w-full flex items-center gap-3 text-base"
                to={ROUTES_ADMIN.AUTH.PROFILE}
              >
                <div className="flex justify-center items-center w-6">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span>Thông tin cá nhân</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="w-full flex items-center gap-3 text-base" onClick={() => logout()}>
                <div className="flex justify-center items-center w-6">
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
