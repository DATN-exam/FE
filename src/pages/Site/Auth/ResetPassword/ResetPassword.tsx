import { Alert, Button, Input } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import authService from '@/services/site/authService'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues = {
  token: '',
  new_password: '',
  confirm_password: '',
}

function ResetPassword() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { new_password: newPasswordError, confirm_password: confirmPasswordError } = errors
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()

  const handleForgotPassword = (fields: any) => {
    showLoading()
    authService
      .confirmForgotPass(fields)
      .then(() => {
        Alert.alert('Thành công', 'Bạn đã đổi mật khẩu thành công', 'success')
      })
      .then(() => {
        navigate(ROUTES_SITE.AUTH.LOGIN)
      })
      .catch(err => {
        handleResponseError(err)
        setErrorForInput(err, setError)
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    if (!token) {
      navigate(ROUTES_SITE.AUTH.LOGIN)
    }
    setValue('token', token ?? '')
  }, [token])

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className="space-y-6">
        <h1 className="text-center text-3xl font-bold text-foreground">Đặt lại mật khẩu</h1>
        <Input
          type="password"
          label="Mật khẩu mới"
          name="new_password"
          control={control}
          error={newPasswordError}
          autoComplete="off"
          isRequired
        />
        <Input
          type="password"
          label="Xác nhận mật khẩu mới"
          name="confirm_password"
          control={control}
          error={confirmPasswordError}
          autoComplete="off"
          isRequired
        />
        <div className="!mt-1 flex justify-end">
          <Link to={ROUTES_SITE.AUTH.LOGIN} className="text-sm text-foreground underline">
            Đăng nhập
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Xác nhận
        </Button>
      </div>
    </form>
  )
}

export default ResetPassword
