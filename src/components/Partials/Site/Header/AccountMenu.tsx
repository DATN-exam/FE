import { Link } from 'react-router-dom'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Modal,
} from '@/components/ui'
import { ROUTES_SITE, ROUTES_TEACHER } from '@/config/routes'
import { useAuth } from '@/contexts/auth'
import { useLoading } from '@/contexts/loading'
import userAvatarDefault from '@/assets/user-avatar-default.png'
import { ROLE } from '@/config/define'
import { useState } from 'react'
import TeacherRegistration from './TeacherRegistration'

const AccountMenu = () => {
  const { authProfile, authLogout } = useAuth()
  const { showLoading, hideLoading } = useLoading()
  const [showModal, setShowModal] = useState(false)

  const logout = () => {
    showLoading()
    authLogout().finally(() => {
      hideLoading()
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="p-0 pl-3 w-fit bg-transparent rounded-full border-none hover:bg-background"
          >
            <div className="rounded-full flex items-center gap-2">
              <p className="text-sm font-normal">{`${authProfile?.first_name} ${authProfile?.last_name}`}</p>
              <img src={userAvatarDefault} alt="user-avatar" className="w-10 h-10 rounded-full" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuItem>
            {authProfile?.role === ROLE.TEACHER ? (
              <Link to={ROUTES_TEACHER.HOME} className="w-full flex items-center gap-3 text-base">
                <div className="flex justify-center items-center w-6">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <span>Trang giáo viên</span>
              </Link>
            ) : authProfile?.has_teacher_registration ? null : (
              <button
                className="w-full flex items-center gap-3 text-base"
                onClick={() => setShowModal(true)}
              >
                <div className="flex justify-center items-center w-6">
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <span>Đăng ký trở thành giáo viên</span>
              </button>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full flex items-center gap-3 text-base"
              to={ROUTES_SITE.AUTH.PROFILE}
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

      <Modal
        show={showModal}
        close={() => {
          setShowModal(false)
        }}
      >
        <TeacherRegistration />
      </Modal>
    </>
  )
}

export default AccountMenu
