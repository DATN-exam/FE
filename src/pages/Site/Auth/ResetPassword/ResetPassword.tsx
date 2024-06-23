import { Button, Input } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const defaultValues = {
  token: '',
  password_new: '',
  password_new_confirm: '',
}

function ResetPassword() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { password_new: passwordNewError, password_new_confirm: passwordNewConfirmError } = errors

  const handleForgotPassword = (fields: any) => {
    console.log(fields)
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
          name="password_new"
          control={control}
          error={passwordNewError}
          autoComplete="off"
          isRequired
        />
        <Input
          type="password"
          label="Xác nhận mật khẩu mới"
          name="password_new_confirm"
          control={control}
          error={passwordNewConfirmError}
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
