import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToggleTheme,
} from '@/components/ui'
import { ROUTES_SITE, ROUTES_TEACHER } from '@/config/routes'
import { Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import { useAuth } from '@/contexts/auth'
import { useLoading } from '@/contexts/loading'

function Header() {
  const { authProfile, authLogout } = useAuth()
  const { showLoading, hideLoading } = useLoading()

  const logout = () => {
    showLoading()
    authLogout().finally(() => {
      hideLoading()
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 flex justify-between items-center gap-5 border-b text-foreground">
      <Link to={ROUTES_SITE.HOME} className="w-[58px] flex justify-center">
        <img src={viteLogo} alt="Logo" />
      </Link>
      <div className="flex items-center gap-1">
        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-0 pl-3 w-fit bg-transparent rounded-full border-none hover:bg-background"
            >
              <div className="rounded-full flex items-center gap-2">
                <p className="text-sm font-normal">{`${authProfile?.first_name} ${authProfile?.last_name}`}</p>
                <img
                  src="https://cdn.discordapp.com/attachments/858695320753012789/1189189524312571984/user-avatar-default.png?ex=6630ea0c&is=661e750c&hm=9c27dfdba4c6a1a223538565c22d7c23b18980b7613f8321b071dd2d872a3b4f&"
                  alt="user-avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem>
              <Link to={ROUTES_TEACHER.HOME} className="w-full flex items-center gap-3 text-base">
                <div className="flex justify-center items-center w-6">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <span>Trang giáo viên</span>
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
    </header>
  )
}

export default Header
