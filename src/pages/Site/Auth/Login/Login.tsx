import { SubmitHandler, useForm } from 'react-hook-form'
import { Input, Button, Checkbox } from '@/components/ui'
import { useAuth } from '@/contexts/auth'
import { useLoading } from '@/contexts/loading'
import { LoginPayloads } from '@/types'
import { setErrorForInput } from '@/utils/handleErrors'
import { Link } from 'react-router-dom'
import { ROUTES_SITE } from '@/config/routes'
import { useState } from 'react'
import useHandleError from '@/hooks/useHandleError'

const defaultValues = {
  email: '',
  password: '',
}

function Login() {
  const { showLoading, hideLoading } = useLoading()
  const { authLogin } = useAuth()
  const { handleResponseError } = useHandleError()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const login: SubmitHandler<LoginPayloads> = data => {
    showLoading()
    authLogin(data)
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        } else {
          handleResponseError(err)
        }
      })
      .finally(() => {
        hideLoading()
      })
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { email: emailError, password: passwordError } = errors

  return (
    <form onSubmit={handleSubmit(login)}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center">Đăng nhập</h1>
        <Input
          type="email"
          placeholder="m@example.com"
          label="Email"
          name="email"
          control={control}
          error={emailError}
        />
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          label="Mật khẩu"
          name="password"
          control={control}
          error={passwordError}
        />
        <div className="flex justify-between !mt-2">
          <Checkbox
            label="Hiển thị mật khẩu"
            name="show-password"
            checked={isShowPassword}
            onCheckedChange={checked => setIsShowPassword(!!checked)}
          />
          <Link to="#" className="text-sm underline">
            Quên mật khẩu
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
        <Button type="submit" className="w-full !mt-3" variant="outline">
          Đăng nhập với Google
        </Button>
        <div className="text-center text-sm">
          Chưa có tài khoản?{' '}
          <Link to={ROUTES_SITE.AUTH.REGISTER} className="underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Login
