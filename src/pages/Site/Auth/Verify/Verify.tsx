import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { ROUTES_SITE } from '@/config/routes'
import { useEffect, useState } from 'react'
import useHandleError from '@/hooks/useHandleError'
import { AUTH_VERIFY_STATUS } from '@/config/define'
import authService from '@/services/site/authService'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-black border-t-transparent ease-linear"></div>
      <h1 className="text-2xl font-medium text-foreground">Đang xác minh tài khoản...</h1>
    </div>
  )
}

const Verified = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center text-7xl">
        <i className="fa-light fa-circle-check text-green-500"></i>
      </div>
      <h1 className="text-2xl font-medium text-foreground">Xác minh thành công</h1>
      <Button
        onClick={() => {
          navigate(ROUTES_SITE.AUTH.LOGIN, { replace: true })
        }}
      >
        Đăng nhập
      </Button>
    </div>
  )
}

const NotVerified = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center text-7xl">
        <i className="fa-sharp fa-light fa-circle-exclamation text-red-500"></i>
      </div>
      <h1 className="text-2xl font-medium text-foreground">Xác minh thất bại</h1>
      <Button
        onClick={() => {
          navigate(ROUTES_SITE.AUTH.LOGIN, { replace: true })
        }}
      >
        Đăng nhập
      </Button>
    </div>
  )
}

function Verify() {
  const { handleResponseError } = useHandleError()
  const [status, setStatus] = useState(AUTH_VERIFY_STATUS.LOADING)
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  const verify = () => {
    authService
      .verify({ token })
      .then(() => {
        setStatus(AUTH_VERIFY_STATUS.VERIFIED)
      })
      .catch(err => {
        handleResponseError(err)
        setStatus(AUTH_VERIFY_STATUS.NOT_VERIFIED)
      })
  }

  useEffect(() => {
    if (!token) {
      setStatus(AUTH_VERIFY_STATUS.NOT_VERIFIED)
    } else {
      verify()
    }
  }, [token])

  return (
    <>
      {status === AUTH_VERIFY_STATUS.LOADING ? (
        <Loading />
      ) : status === AUTH_VERIFY_STATUS.VERIFIED ? (
        <Verified />
      ) : (
        <NotVerified />
      )}
    </>
  )
}

export default Verify
